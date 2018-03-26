import { Component, Vue } from 'vue-property-decorator';
import { mutationTypes } from './../../store/';
import {RouterDefaultComponentAbstract} from '../router';

@Component({
    template: require('./home.html')
})
export class HomeComponent extends RouterDefaultComponentAbstract {
    beforeCreate() {
        this.$store.commit(mutationTypes.REDUCE_BACKGROUND);
    }
}