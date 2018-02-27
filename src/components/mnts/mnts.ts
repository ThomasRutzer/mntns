import {Component, Vue, Watch} from 'vue-property-decorator';

import * as actionTypes from './../../store/action-types';

import { GeneratorComponent } from './../../../node_modules/mnts/src/components/generator';
import { SceneComponent } from './../../../node_modules/mnts/src/components/scene';

Vue.component('generator', GeneratorComponent);
Vue.component('scene', SceneComponent);

@Component({
    template: require('./mnts.html'),
})

export class MntsComponent extends Vue {
    data: any[] = [];

    @Watch('$store.state.currentRoute.titleAnimatedIn')
    watchHandler() {
        this.data = this.$store.state.mappedRepos;
    }

    async created() {
        await this.$store.dispatch(actionTypes.RETRIEVE_GITHUB_REPOS);
    }

    expandMnts() {
        this.$router.push('mnts');
    }
}