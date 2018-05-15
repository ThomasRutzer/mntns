import {Component} from 'vue-property-decorator';
import {RouterDefaultComponentAbstract} from './../router';

import { config } from './../mnts';

import {mutationTypes} from './../../store/';

@Component({
    template: require('./experiment-start.html'),
    computed: {
        canStart() {
            return !this.$store.state.gitHubData.loadingError &&
                this.$store.state.gitHubData.repos.mapped &&
                this.titleIn;
        },

        cannotStart() {
            return this.$store.state.gitHubData.loadingError &&
                this.titleIn;
        }
    }
})

export class ExperimentStartComponent extends RouterDefaultComponentAbstract {
    private isStarted: boolean = false;
    private currentGithubUser: string = config.gitHubUsername;

    beforeCreate() {
        this.$store.commit(mutationTypes.EXPAND_BACKGROUND);
        this.$store.commit(mutationTypes.DEACTIVATE_BACKGROUND);
    }

    beforeDestroy() {
        this.$store.commit(mutationTypes.DEACTIVATE_BACKGROUND);
        this.$store.commit(mutationTypes.UNFOCUS_REPO);
    }

    startExperiment() {
        this.isStarted = true;
        this.$store.commit(mutationTypes.ACTIVATE_BACKGROUND);
        this.$store.commit(mutationTypes.FOOTER_VISIBLE, false);
    }
}