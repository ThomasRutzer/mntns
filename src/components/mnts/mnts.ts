import {Component, Vue, Watch} from 'vue-property-decorator';
import { types, diContainer } from "./../dependency-injection";

import * as actionTypes from './../../store/action-types';
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
    service: MntsServiceInterface;

    @Watch('$store.state.currentRoute.titleAnimatedIn')
    watchHandler() {
        this.data = this.$store.state.gitHubData.mappedRepos;
    }

    async created() {
        this.service = diContainer.get<MntsServiceInterface>(types.MntnsService);
        this.$store.commit(mutationTypes.MNTNS_NEXT_LEVEL, { level: 1});
        await this.$store.dispatch(actionTypes.RETRIEVE_GITHUB_REPOS, config.gitHubUsername);
    }

    expandMnts() {
        this.$router.push('/mnts');
    }

    async focusedMnt(event: {objectId: string, type: string}): void {

        // certain scene objects might not be focused
        if (config.excludedFocusableObjectIds.indexOf(event.objectId) != -1) {
            return Promise.resolve();
        }

        await this.service.focusData(event.objectId);

        if(event.type === config.eventToUpdateLevel) {

            const level = this.$store.state.level < config.maxLevel
                ? this.$store.state.level + 1
                : config.maxLevel;

            this.$store.commit(mutationTypes.MNTNS_NEXT_LEVEL, { level });
        }
    }
}