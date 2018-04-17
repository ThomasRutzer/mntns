import {Component, Vue, Watch, Prop} from 'vue-property-decorator';
import { types, diContainer } from './../dependency-injection';

import { mutationTypes } from './../../store';

import { MntsServiceInterface } from './mnts-service-interface';

import config from './mnts-config';

@Component({
    template: require('./mnts.html'),
    computed: {
        level() {
            return {
                index: this.$store.state.mntns.levels.currentLevel,
                title: this.$store.state.mntns.levels.allLevels[this.$store.state.mntns.levels.currentLevel - 1].title
            };
        },

        isActivated() {
            if (this.$store.state.background.activated) {
                this.service.setCameraToStart();
            }

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

    @Prop({default: 'mntns-scene1'})
    mId: string;

    @Watch('$store.state.currentRoute.titleAnimatedIn')
    watchHandler() {
        this.dataWatcher();
    }

    @Watch('$store.state.gitHubData.usedData.mapped')
    dataWatcher() {
        if (!this.$store.state.currentRoute.titleAnimatedIn) return;

        this.data = this.$store.state.gitHubData.usedData.mapped;
    }

    beforeDestroy() {
        this.$store.commit(mutationTypes.DEACTIVATE_BACKGROUND);
        this.$store.commit(mutationTypes.UNFOCUS_REPO);
    }

    async mounted() {
        this.$store.commit(mutationTypes.DEACTIVATE_BACKGROUND);

        // @ts-ignore: Cannot invoke an expression whose type lacks a call signature.
        // Type 'MntsServiceInterface' has no compatible call signatures
        this.service = diContainer.get<MntsServiceInterface>(types.MntnsServiceFactory)(this.mId);
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

        document.removeEventListener(
            'keydown',
            this.clearKeyHandler,
            false
        );
    }

    updateDetailedData(): void {
        this.detailedData = {
            title: '',
            url: ''
        };

        document.addEventListener(
            'keydown',
            this.clearKeyHandler,
            false
        );

        switch (this.$store.state.mntns.levels.currentLevel) {
            case(1):
                this.detailedData.title = this.$store.state.gitHubData.focusedData.raw.name;
                this.detailedData.url = this.$store.state.gitHubData.focusedData.raw.url;
                break;

            case (2):
                this.detailedData.title = this.$store.state.gitHubData.focusedData.raw.commit.message;
                this.detailedData.url = this.$store.state.gitHubData.focusedData.raw.tree.url;
        }

        return;
    }

    clearFocusedData()  {
        this.outside = null;
        this.focusedData = null;
    }

    clearKeyHandler(e: KeyboardEvent) {
        if (e.keyCode === 27) {
            this.clearDetailedData();
        }
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

    onIntersection(data: any) {

        // display no intersection
        // when deactivated...
        if (!this.isActivated) {
            return;
        }

        // close detailedData on another mousedown
        // and return...
        if (this.detailedData && data.event.type === config.eventToUpdateLevel) {
            this.clearDetailedData();
            return;
        }

        // ...or return when detailedData is displayed
        // and no other mousedown caught
        if (this.detailedData) {
            return;
        }

        // certain scene objects might not be focused
        if (config.excludedFocusableObjectIds.indexOf(data.object.name) !== -1) {
            this.clearFocusedData();
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