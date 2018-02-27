import {Component, Vue, Watch} from 'vue-property-decorator';
import * as actionTypes from './../../store/action-types';
import 'mnts/src/components/generator';

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