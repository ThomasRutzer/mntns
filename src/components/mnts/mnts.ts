import {Component, Vue, Watch} from 'vue-property-decorator';
import * as actionTypes from './../../store/action-types';
import * as mutationTypes from './../../store/mutation-types';

@Component({
    template: require('./mnts.html'),
    computed: {
        isActivated() {
            return this.$store.state.background.activated;
        }
    },
})

export class MntsComponent extends Vue {
    data: any[] = [];

    @Watch('$store.state.currentRoute.titleAnimatedIn')
    watchHandler() {
        this.data = this.$store.state.gitHubData.mappedRepos;
    }

    async created() {
        await this.$store.dispatch(actionTypes.RETRIEVE_GITHUB_REPOS, 'addyosmani');
    }

    expandMnts() {
        this.$router.push('/mnts');
    }

    focusedMnt(event: {objectId: string}) {
        const raw = this.$store.state.gitHubData.rawRepos.filter((data) => {
            return data.id.toString() === event.objectId;
        });

        if (raw.length > 0) {
            const mapped = this.$store.state.gitHubData.mappedRepos.filter((data) => {
                return data.id === event.objectId;
            });

            this.$store.commit(mutationTypes.FOCUS_REPO, {
                event,
                raw: raw[0],
                mapped: mapped[0]
            })
        } else {
            this.$store.commit(mutationTypes.UNFOCUS_REPO);
        }
    }
}