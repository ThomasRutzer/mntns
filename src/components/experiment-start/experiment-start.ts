import {Component} from 'vue-property-decorator';
import {RouterDefaultComponentAbstract} from './../router';

import {mutationTypes} from './../../store/';

@Component({
    template: require('./experiment-start.html'),
    computed: {
        canStart() {
            return !this.$store.state.gitHubData.loadingError &&
                this.$store.state.gitHubData.repos[this.$store.state.gitHubData.userName] &&
                this.$store.state.gitHubData.repos[this.$store.state.gitHubData.userName].mapped &&
                this.titleIn;
        },

        cannotStart() {
            return this.$store.state.gitHubData.loadingError &&
                this.titleIn;
        },

        currentGithubUser() {
            return this.$store.state.gitHubData.userName;
        }
    }
})

export class ExperimentStartComponent extends RouterDefaultComponentAbstract {
    private isStarted: boolean = false;

    beforeCreate() {
        this.$store.commit(mutationTypes.EXPAND_EXPERIMENT_CONTAINER);
        this.$store.commit(mutationTypes.DEACTIVATE_EXPERIMENT_CONTAINER);
    }

    beforeDestroy() {
        this.$store.commit(mutationTypes.DEACTIVATE_EXPERIMENT_CONTAINER);
        this.$store.commit(mutationTypes.UNFOCUS_REPO);
    }

    startExperiment() {
        this.isStarted = true;
        this.$store.commit(mutationTypes.ACTIVATE_EXPERIMENT_CONTAINER);
        this.$store.commit(mutationTypes.FOOTER_VISIBLE, false);
    }
}