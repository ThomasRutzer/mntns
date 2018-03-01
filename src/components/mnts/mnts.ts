import {Component, Vue, Watch} from 'vue-property-decorator';
import * as actionTypes from './../../store/action-types';
import * as mutationTypes from './../../store/mutation-types';
import 'mnts/src/components/generator';

@Component({
    template: require('./mnts.html'),
    computed: {
        isActivated() {
            return this.$store.state.background.activated;
        }
    },
})

// @todo: write specs
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
        this.$router.push('/mnts');
    }

    focusedMnt(event: {objectId: string}) {
        const raw = this.$store.state.rawRepos.filter((data) => {
            return data.id.toString() === event.objectId;
        });

        if (raw) {
            const mapped = this.$store.state.mappedRepos.filter((data) => {
                return data.id === event.objectId;
            });

            this.$store.commit(mutationTypes.FOCUS_REPO, {
                event,
                raw,
                mapped
            })
        } else {
            this.$store.commit(mutationTypes.UNFOCUS_REPO);
        }
    }
}