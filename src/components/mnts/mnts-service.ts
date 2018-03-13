import {MntsServiceInterface} from "./mnts-service-interface";
import config from './mnts-config';
import { injectable } from "inversify";
import store from './../../store';
import * as actionTypes from './../../store/action-types';
import * as mutationTypes from './../../store/mutation-types';

@injectable()
class MntsService implements MntsServiceInterface {

    public focusData(id: string) {

        let raw, mapped;

        raw = store.state.gitHubData.usedData.raw.filter((data) => {
            return data.id.toString() === id;
        });

        mapped = store.state.gitHubData.usedData.mapped.filter((data) => {
            return data.id === id;
        });

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

    public async nextState() {
        const level = store.state.level < config.maxLevel
            ? store.state.level + 1
            : config.maxLevel;

        store.commit(mutationTypes.MNTNS_UPDATE_LEVEL, { level });

        await this.progessState();
    }

    public async previousStep() {
        store.commit(mutationTypes.MNTNS_UPDATE_LEVEL, { level: 1 });

        await this.progessState();
    }

    public async start() {
        store.commit(mutationTypes.MNTNS_UPDATE_LEVEL, { level: 1});

        await this.loadRepos();
        store.commit(mutationTypes.USED_DATA, {
            raw: store.state.gitHubData.repos.raw,
            mapped: store.state.gitHubData.repos.mapped
        })
    }

    private async progessState() {

        if (store.state.mntns.level === 1) {
            await this.loadRepos();
            store.commit(mutationTypes.USED_DATA, {
                raw: store.state.gitHubData.repos.raw,
                mapped: store.state.gitHubData.repos.mapped
            })

        } else if (store.state.mntns.level === 2) {
            const repoName = store.state.gitHubData.focusedData.raw.name;
            await this.loadCommits(repoName);

            store.commit(mutationTypes.USED_DATA, {
                raw: store.state.gitHubData.commits[repoName].raw,
                mapped: store.state.gitHubData.commits[repoName].mapped
            })
        }
    }

    private async loadCommits(repoName) {
        await store.dispatch(
                actionTypes.RETRIEVE_GITHUB_COMMITS_FOR_REPO,
                { repoName, userName: config.gitHubUsername, perPage: config.maxSceneItems }
            );
        return Promise.resolve();
    }

    private async loadRepos() {
        await store.dispatch(
                actionTypes.RETRIEVE_GITHUB_REPOS,
                { userName: config.gitHubUsername, perPage: config.maxSceneItems }
            );
        return Promise.resolve();
    }
}

export default MntsService;
