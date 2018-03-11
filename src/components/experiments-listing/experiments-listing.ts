import {Component, Vue} from 'vue-property-decorator';
import {mutationTypes} from './../../store/';
import { types, diContainer } from "./../dependency-injection";

import { MntsServiceInterface, config } from './../mnts';

@Component({
    template: require('./experiments-listing.html'),
    computed: {
        isActivated() {
            return this.$store.state.background.activated;
        },

        dataLoaded() {
            return this.$store.state.currentRoute.titleAnimatedIn;
        },

        focusedData() {
            return this.$store.state.gitHubData.focusedData.raw
        },

        focusedEvent() {
            this.outside = this.$store.state.gitHubData.focusedData.event.x > (window.innerWidth / 2);
            this.showDetails();

            return this.$store.state.gitHubData.focusedData.event
        },

        level() {
            return this.$store.state.mntns.level;
        }
    },
})

export class ExperimentsListingComponent extends Vue {
    private outside: boolean = false;
    private details: boolean = false;
    private mntnsService: MntsServiceInterface;


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

    activate() {
        this.$store.commit(mutationTypes.ACTIVATE_BACKGROUND);
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

        this.details = this.$store.state.gitHubData.focusedData.event.type == config.eventToUpdateLevel
    }

    hideDetails() {
        this.details = false;
    }
}