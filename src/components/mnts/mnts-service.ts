import { Store } from 'vuex';
import {MntsServiceInterface} from './mnts-service-interface';
import config from './mnts-config';
import { injectable, inject } from 'inversify';
import GeneratorManagerInterface from 'mnts/src/components/generator/manager/GeneratorManagerInterface';
import * as actionTypes from './../../store/action-types';
import * as mutationTypes from './../../store/mutation-types';
import types from '../dependency-injection/types';

@injectable()
class MntsService implements MntsServiceInterface {
    private store: Store<any>;
    private generatorManager: GeneratorManagerInterface = null;

    constructor(
        @inject(types.Store) store,
        GeneratorManager: GeneratorManagerInterface
    ) {
        this.store = store;
        this.generatorManager = GeneratorManager;
    }

    public focusData(id: string) {

        let raw, mapped;

        raw = this.store.state.gitHubData.usedData.raw.filter((data) => {
            return data.id.toString() === id;
        });

        mapped = this.store.state.gitHubData.usedData.mapped.filter((data) => {
            return data.id === id;
        });

        if (raw.length > 0) {

            this.store.commit(mutationTypes.FOCUS_REPO, {
                event,
                raw: raw[0],
                mapped: mapped[0],
                id: id
            });

        } else {
            this.store.commit(mutationTypes.UNFOCUS_REPO);
        }
    }

    public async nextStep() {
        const level = this.store.state.levels.currentLevel < this.store.state.levels.allLevels.length
            ? this.store.state.levels.currentLevel + 1
            : this.store.state.levels.allLevels.length;

        this.store.commit(mutationTypes.UPDATE_LEVEL, { level });

        await this.progessState();
    }

    public async previousStep() {
        this.store.commit(mutationTypes.UPDATE_LEVEL, { level: 1 });

        await this.progessState();
    }

    public async start() {
        this.store.commit(mutationTypes.UPDATE_LEVEL, { level: 1});

        await this.loadRepos();
        this.store.commit(mutationTypes.USED_DATA, {
            raw: this.store.state.gitHubData.repos.raw,
            mapped: this.store.state.gitHubData.repos.mapped
        });
    }

    public setCameraToStart() {
        this.generatorManager.setCamera('start');
    }

    private async progessState() {

        if (this.store.state.levels.currentLevel === 1) {
            await this.loadRepos();
            this.store.commit(mutationTypes.USED_DATA, {
                raw: this.store.state.gitHubData.repos.raw,
                mapped: this.store.state.gitHubData.repos.mapped
            });

        } else if (this.store.state.levels.currentLevel === 2) {
            const repoName = this.store.state.gitHubData.focusedData.raw.name;
            await this.loadCommits(repoName);

            this.store.commit(mutationTypes.USED_DATA, {
                raw: this.store.state.gitHubData.commits[repoName].raw,
                mapped: this.store.state.gitHubData.commits[repoName].mapped
            });
        }
    }

    private async loadCommits(repoName) {
        await this.store.dispatch(
                actionTypes.RETRIEVE_GITHUB_COMMITS_FOR_REPO,
                { repoName, userName: config.gitHubUsername, perPage: config.maxSceneItems }
            );
        return Promise.resolve();
    }

    private async loadRepos() {
        await this.store.dispatch(
                actionTypes.RETRIEVE_GITHUB_REPOS,
                { userName: config.gitHubUsername, perPage: config.maxSceneItems }
            );
        return Promise.resolve();
    }
}

export default MntsService;
