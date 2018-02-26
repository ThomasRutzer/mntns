import { Component, Vue } from 'vue-property-decorator';

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

    async created() {
        await this.$store.dispatch(actionTypes.RETRIEVE_GITHUB_REPOS);
        this.data = this.$store.state.mappedRepos;
    }

    expandMnts() {
        this.$router.push('mnts');
    }
}