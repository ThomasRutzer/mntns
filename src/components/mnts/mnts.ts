import {Component, Vue, Watch} from 'vue-property-decorator';
import { types, diContainer } from './../dependency-injection';

import { mutationTypes } from './../../store';

import { MntsServiceInterface } from './mnts-service-interface';
import config from './mnts-config';

@Component({
    template: require('./mnts.html'),
    computed: {
        level() {
            return this.$store.state.mntns.levels.currentLevel;
        },

        isActivated() {
            return this.$store.state.background.activated;
        },

        focusedEvent() {
            return this.$store.state.gitHubData.focusedData.event;
        },
    },
})

export class MntsComponent extends Vue {
    /**
     * @type {Array} data > stores data to visualize mntns
     */
    private data: any[] = [];

    private isActivated: boolean;
    private focusedEvent: any;

    private outside: boolean = false;
    private focusedData: string = null;
    private detailedData: {title: string, url: string} = null;
    private service: MntsServiceInterface;

    @Watch('$store.state.currentRoute.titleAnimatedIn')
    watchHandler() {
        this.dataWatcher();
    }

    @Watch('$store.state.gitHubData.usedData.mapped')
    dataWatcher() {
        this.data = this.$store.state.gitHubData.usedData.mapped;
    }

    beforeDestroy() {
        this.$store.commit(mutationTypes.DEACTIVATE_BACKGROUND);
        this.$store.commit(mutationTypes.UNFOCUS_REPO);
    }

    async created() {
        this.$store.commit(mutationTypes.DEACTIVATE_BACKGROUND);
        this.$store.commit(mutationTypes.MNTNS_UPDATE_LEVEL, { level: 1 });

        this.service = diContainer.get<MntsServiceInterface>(types.MntnsService);

        await this.service.start();
    }

    back() {
        this.clearDetailedData();
        this.service.previousStep();
    }

    forwards() {
        this.clearDetailedData();
        this.service.nextStep();
    }

    clearDetailedData() {
        this.detailedData = null;
    }

    updateDetailedData() {
        this.detailedData = {
            title: '',
            url: ''
        };

        switch (this.$store.state.mntns.levels.currentLevel) {
            case(1):
                this.detailedData.title = this.$store.state.gitHubData.focusedData.raw.name;
                this.detailedData.url = this.$store.state.gitHubData.focusedData.raw.url;
                break;

            case (2):
                this.detailedData.title = this.$store.state.gitHubData.focusedData.raw.commit.message;
                this.detailedData.url = this.$store.state.gitHubData.focusedData.raw.tree.url;
        }

        return null;

    }

    clearFocusedData()  {
        this.outside = null;
        this.focusedData = null;
    }

    updateFocusedData() {
        this.outside = this.$store.state.gitHubData.focusedData.event.x > (window.innerWidth / 2);

        switch (this.$store.state.mntns.levels.currentLevel) {
            case(1):
                this.focusedData = this.$store.state.gitHubData.focusedData.raw.name;
                break;

            case (2):
                this.focusedData = this.$store.state.gitHubData.focusedData.raw.commit.message;
        }

        return null;
    }

    expandMnts() {
        this.$router.push('/experiments');
    }

    focusObject(data: any) {

        if (!this.isActivated || this.detailedData) {
            return;
        }

        // certain scene objects might not be focused
        if (config.excludedFocusableObjectIds.indexOf(data.object.name) !== -1) {
            return;
        }

        this.service.focusData(data.object.name);

        if (data.event.type === config.eventToUpdateLevel) {
            this.clearFocusedData();
            this.updateDetailedData();
        } else {
            this.clearDetailedData();
            this.updateFocusedData();
        }
    }
}