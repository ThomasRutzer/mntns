import {Component, Vue, Watch} from 'vue-property-decorator';
import * as actionTypes from './../../store/action-types';
import * as mutationTypes from './../../store/mutation-types';
import { findDeep } from './../object-utils';

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
        this.$store.commit(mutationTypes.MNTNS_NEXT_LEVEL, { level: 1});
        await this.$store.dispatch(actionTypes.RETRIEVE_GITHUB_REPOS, 'addyosmani');
    }

    expandMnts() {
        this.$router.push('/mnts');
    }

    focusedMnt(event: {objectId: string}) {
        let mapped, raw;

        // state.mntns.level determines whether
        // filter repos or commits
        if (this.$store.state.mntns.level === 1) {

            raw = this.$store.state.gitHubData.rawRepos.filter((data) => {
                return data.id.toString() === event.objectId;
            });

            mapped = this.$store.state.gitHubData.mappedRepos.filter((data) => {
                return data.id === event.objectId;
            });

        } else if (this.$store.state.mntns.level === 2) {
            const repoName = this.$store.state.gitHubData.focusedRepo.raw.name;

            raw = this.$store.state.gitHubData.commits[repoName].filter((data) => {
                return data.id === event.objectId;
            });

            mapped = this.$store.state.gitHubData.commits[repoName].filter((data) => {
                return data.id === event.objectId;
            });
        }

        if (raw.length > 0) {

            this.$store.commit(mutationTypes.FOCUS_REPO, {
                event,
                raw: raw[0],
                mapped: mapped[0],
                id: event.objectId
            })

        } else {
            this.$store.commit(mutationTypes.UNFOCUS_REPO);
        }
    }
}