import {Component, Vue, Watch} from 'vue-property-decorator';
import { types, diContainer } from "./../dependency-injection";

import * as mutationTypes from './../../store/mutation-types';
import { MntsServiceInterface } from "./mnts-service-interface";
import config from './mnts-config';

@Component({
    template: require('./mnts.html'),
    computed: {
        isActivated() {
            return this.$store.state.background.activated;
        }
    },
})

export class MntsComponent extends Vue {
    data: any[] = [];
    dataEnabled: boolean = false;
    service: MntsServiceInterface;

    @Watch('$store.state.currentRoute.titleAnimatedIn')
    watchHandler() {
        if (!this.dataEnabled) {
            return;
        }

        this.data = this.$store.state.gitHubData.usedRepo.mapped;
    }

    @Watch('$store.state.gitHubData.usedRepo.mapped')
    dataWatcher() {
        this.data = this.$store.state.gitHubData.usedRepo.mapped;
    }

    async created() {
        this.service = diContainer.get<MntsServiceInterface>(types.MntnsService);

        await this.service.start();
    }

    expandMnts() {
        this.$router.push('/mnts');
    }

    focusObject(data: {objectId: string, event: {type: string}}) {

        // certain scene objects might not be focused
        if (config.excludedFocusableObjectIds.indexOf(data.objectId) != -1) {
            return;
        }

        this.service.focusData(data.objectId);
    }
}