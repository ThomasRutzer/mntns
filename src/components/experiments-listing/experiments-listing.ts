import { Component, Vue } from 'vue-property-decorator';
import { mutationTypes } from './../../store/';

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
            return this.$store.state.gitHubData.focusedRepo.raw
        },

        focusedEvent() {
            this.outside = this.$store.state.gitHubData.focusedRepo.event.mouseX > (window.innerWidth / 2);
            return this.$store.state.gitHubData.focusedRepo.event
        }
    },
})

export class ExperimentsListingComponent extends Vue {
    private outside: boolean = false;

    beforeCreate() {
        this.$store.commit(mutationTypes.EXPAND_BACKGROUND);
        this.$store.commit(mutationTypes.DEACTIVATE_BACKGROUND);
    }

    beforeDestroy() {
        this.$store.commit(mutationTypes.DEACTIVATE_BACKGROUND);
        this.$store.commit(mutationTypes.UNFOCUS_REPO);
    }

    activate() {
        this.$store.commit(mutationTypes.ACTIVATE_BACKGROUND);
    }
}