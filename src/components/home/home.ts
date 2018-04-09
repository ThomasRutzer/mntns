import { Component } from 'vue-property-decorator';
import { mutationTypes } from './../../store/';
import {RouterDefaultComponentAbstract} from '../router';

@Component({
    template: require('./home.html'),
})
export class HomeComponent extends RouterDefaultComponentAbstract {

    beforeCreate() {
        this.$store.commit(mutationTypes.CONTENT_NOT_CLICKABLE);
        this.$store.commit(mutationTypes.REDUCE_BACKGROUND);
    }

    destroyed() {
        this.$store.commit(mutationTypes.CONTENT_CLICKABLE);
    }
}