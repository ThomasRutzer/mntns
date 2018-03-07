import {MntsServiceInterface} from "./mnts-service-interface";
import { injectable } from "inversify";
import store from './../../store';
import * as actionTypes from './../../store/action-types';
import * as mutationTypes from './../../store/mutation-types';

const gitHubUserName = 'addyosmani';

@injectable()
class MntsService implements MntsServiceInterface {
    public async updateFocusedData(id: string) {

        let raw, mapped;

        // state.mntns.level determines whether
        // filter repos or commits
        if (store.state.mntns.level === 1) {
            await this.loadRepos();

            raw = store.state.gitHubData.rawRepos.filter((data) => {
                return data.id.toString() === id;
            });

            mapped = store.state.gitHubData.mappedRepos.filter((data) => {
                return data.id === id;
            });

        } else if (store.state.mntns.level === 2) {
            const repoName = store.state.gitHubData.focusedRepo.raw.name;
            await this.loadCommit(repoName);

            raw = store.state.gitHubData.commits[repoName].raw.filter((data) => {
                return data.id === id;
            });

            mapped = store.state.gitHubData.commits[repoName].mapped.filter((data) => {
                return data.id === id;
            });
        }

        if (raw.length > 0) {

            store.commit(mutationTypes.FOCUS_REPO, {
                event,
                raw: raw[0],
                mapped: mapped[0],
                id: id
            })

        } else {
            store.commit(mutationTypes.UNFOCUS_REPO);
        }
    }

    private async loadCommit(repoName) {
        await store.dispatch(actionTypes.RETRIEVE_GITHUB_COMMITS_FOR_REPO, { repoName, userName: gitHubUserName});
        return Promise.resolve();
    }

    private async loadRepos() {
        await store.dispatch(actionTypes.RETRIEVE_GITHUB_REPOS, gitHubUserName);
        return Promise.resolve();
    }
}

export default MntsService;
export {
    gitHubUserName
}