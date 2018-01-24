import { Component, Vue } from 'vue-property-decorator';
import { mutationTypes } from './../../store/';

@Component({
    template: require('./home.html')
})
export class HomeComponent extends Vue {
    mounted() {
        this.$store.commit(mutationTypes.EXPAND_BACKGROUND);


    }
}