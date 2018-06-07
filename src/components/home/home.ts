import { Component } from 'vue-property-decorator';
import { mutationTypes } from './../../store/';
import { RouterDefaultComponentAbstract } from '../router';

@Component({
    template: require('./home.html'),
    computed: {
        canStart() {
            return this.titleIn;
        }
    }
})
export class HomeComponent extends RouterDefaultComponentAbstract {
    beforeCreate() {
        this.$store.commit(mutationTypes.REDUCE_EXPERIMENT_CONTAINER);
    }

    startExperiment() {
        this.$router.push('/experiment');
    }
}