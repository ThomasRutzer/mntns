import {Component, Vue, Watch} from 'vue-property-decorator';
import {mutationTypes} from './../../store/';
import { types, diContainer } from "./../dependency-injection";

import { MntsServiceInterface, config } from './../mnts';

@Component({
    template: require('./experiments-listing.html'),
    computed: {
        dataLoaded() {
            return this.$store.state.currentRoute.titleAnimatedIn;
        },

        level() {
            return this.$store.state.mntns.level;
        }
    },
})

export class ExperimentsListingComponent extends Vue {
    private isActivated: boolean = false;
    private details: boolean = false;
    private mntnsService: MntsServiceInterface;

    @Watch('$store.state.gitHubData.focusedData.event')
    eventWatchHandler() {
        if (event.type === config.eventToUpdateLevel) {
            this.showDetails();
        }
    }

    beforeCreate() {
        this.$store.commit(mutationTypes.EXPAND_BACKGROUND);
        this.$store.commit(mutationTypes.DEACTIVATE_BACKGROUND);
    }

    beforeDestroy() {
        this.$store.commit(mutationTypes.DEACTIVATE_BACKGROUND);
        this.$store.commit(mutationTypes.UNFOCUS_REPO);
    }

    created() {
        this.mntnsService = diContainer.get<MntsServiceInterface>(types.MntnsService);
    }

    activateExperiment() {
        this.isActivated = true;
        this.$store.commit(mutationTypes.ACTIVATE_BACKGROUND);
    }

    deactivateExperiment() {
        this.isActivated = true;
        this.$store.commit(mutationTypes.DEACTIVATE_BACKGROUND);
    }

    async nextStep() {
        await this.mntnsService.nextState();
        this.hideDetails();
    }

    async back() {
        await this.mntnsService.previousStep();
    }

    showDetails() {
        if (this.details) {
            return;
        }

        this.details = this.$store.state.gitHubData.focusedData
    }

    hideDetails() {
        this.details = false;
    }
}