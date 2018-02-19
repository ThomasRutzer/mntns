import { Component, Vue } from 'vue-property-decorator';
import { mutationTypes } from './../../store/';

@Component({
    template: require('./home.html')
})
export class HomeComponent extends Vue {
    beforeCreate() {
        this.$store.commit(mutationTypes.REDUCE_BACKGROUND);
    }
}