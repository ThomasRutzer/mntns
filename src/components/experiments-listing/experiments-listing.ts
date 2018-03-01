import { Component, Vue } from 'vue-property-decorator';
import { mutationTypes } from './../../store/';

@Component({
    template: require('./experiments-listing.html'),
    computed: {
        isActivated() {
            return this.$store.state.background.activated;
        }
    },
})

export class ExperimentsListingComponent extends Vue {

    beforeCreate() {
        this.$store.commit(mutationTypes.EXPAND_BACKGROUND);
    }

    activate() {
        this.$store.commit(mutationTypes.ACTIVATE_BACKGROUND);
    }
}