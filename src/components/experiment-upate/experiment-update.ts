import {Component} from 'vue-property-decorator';
import {RouterDefaultComponentAbstract} from './../router';

import {mutationTypes} from './../../store/';

@Component({
    template: require('./experiment-update.html'),
})

export class ExperimentUpdateComponent extends RouterDefaultComponentAbstract {
    beforeCreate() {
        this.$store.commit(mutationTypes.EXPAND_EXPERIMENT_CONTAINER);
        this.$store.commit(mutationTypes.DEACTIVATE_EXPERIMENT_CONTAINER);
    }
}