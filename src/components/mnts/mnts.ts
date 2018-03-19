import SceneIntersectionModelInterface from 'mnts/src/components/scene';
import {Component, Vue, Watch} from 'vue-property-decorator';
import { types, diContainer } from "./../dependency-injection";

import { MntsServiceInterface } from "./mnts-service-interface";
import config from './mnts-config';

@Component({
    template: require('./mnts.html'),
    computed: {
        isActivated() {
            return this.$store.state.background.activated;
        },

        focusedEvent() {
            return this.$store.state.gitHubData.focusedData.event
        },
    },
})

export class MntsComponent extends Vue {
    private data: any[] = [];
    private outside: boolean = false;
    private focusedData: string = null;
    private service: MntsServiceInterface;

    @Watch('$store.state.currentRoute.titleAnimatedIn')
    watchHandler() {
        this.dataWatcher();
    }

    @Watch('$store.state.gitHubData.usedData.mapped')
    dataWatcher() {
        this.data = this.$store.state.gitHubData.usedData.mapped;
    }

    focusedWatcher() {
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

    async created() {
        this.service = diContainer.get<MntsServiceInterface>(types.MntnsService);

        await this.service.start();
    }

    expandMnts() {
        this.$router.push('/mnts');
    }

    focusObject(data: SceneIntersectionModelInterface) {

        // certain scene objects might not be focused
        if (config.excludedFocusableObjectIds.indexOf(data.object.name) != -1) {
            return;
        }

        if (!this.isActivated) {
            this.focusedData = null;
        } else {
            this.service.focusData(data.object.name);
            this.focusedWatcher();
        }
    }
}