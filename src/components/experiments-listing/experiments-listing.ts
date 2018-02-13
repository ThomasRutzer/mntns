import { Component, Vue } from 'vue-property-decorator';
import { mutationTypes } from './../../store/';

@Component({
    template: require('./experiments-listing.html')
})

export class ExperimentsListingComponent extends Vue {

    mounted() {
        this.$store.commit(mutationTypes.EXPAND_BACKGROUND);
    }
}