import { Component } from 'vue-property-decorator';
import { mutationTypes } from './../../store/';
import {RouterDefaultComponentAbstract} from '../router';

@Component({
    template: require('./home.html'),
    computed: {
        canStart() {
            return this.titleIn;
        }
    }
})
export class HomeComponent extends RouterDefaultComponentAbstract {
    // private isStarted: boolean = false;

    beforeCreate() {
       // this.$store.commit(mutationTypes.CONTENT_NOT_CLICKABLE);
        this.$store.commit(mutationTypes.REDUCE_EXPERIMENT_CONTAINER);

       // this.$store.commit(mutationTypes.DEACTIVATE_EXPERIMENT_CONTAINER);
    }


    beforeDestroy() {
        // this.$store.commit(mutationTypes.DEACTIVATE_EXPERIMENT_CONTAINER);
       // this.$store.commit(mutationTypes.UNFOCUS_REPO);
    }

    destroyed() {
        // this.$store.commit(mutationTypes.CONTENT_CLICKABLE);
    }

    startExperiment() {
        // this.isStarted = true;
        // this.$store.commit(mutationTypes.ACTIVATE_EXPERIMENT_CONTAINER);
        // this.$store.commit(mutationTypes.FOOTER_VISIBLE, false);
       // this.$store.commit(mutationTypes.EXPAND_EXPERIMENT_CONTAINER);
        this.$router.push('/experiment');
    }
}