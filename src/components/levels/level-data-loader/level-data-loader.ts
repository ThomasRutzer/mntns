/**
 * class to load data source
 * defined in LevelModel
 */
import { injectable, inject } from 'inversify';
import types from './../../dependency-injection/types';
import { actionTypes, mutationTypes } from './../../../store';
import { Store } from 'vuex';
import { LevelDataLoaderInterface } from './level-data-loader-interface';
import landscapeConfig from './../../mnts/mnts-config';
import levelDataSources from './level-data-sources';

@injectable()
class LevelDataLoader implements LevelDataLoaderInterface {
    private store: Store<any>;

    constructor(
        @inject(types.Store) store,
    ) {
        this.store = store;
    }

    public async loadByType(type: string): Promise<any> {
        if (type === levelDataSources.REPOS) {
            await this.store.dispatch(
                actionTypes.RETRIEVE_GITHUB_REPOS,
                {
                    userName: this.store.state.gitHubData.userName,
                    perPage: landscapeConfig.maxSceneItems
                }
            );

            this.store.commit(mutationTypes.USED_DATA, {
                raw: this.store.state.gitHubData.repos[this.store.state.gitHubData.userName].raw,
                mapped: this.store.state.gitHubData.repos[this.store.state.gitHubData.userName].mapped,
                dataSrc: type
            });

            return Promise.resolve();
        }

        if (type === levelDataSources.COMMITS) {
            const repoName = this.store.state.gitHubData.focusedData.raw.name;

            await this.store.dispatch(
                actionTypes.RETRIEVE_GITHUB_COMMITS_FOR_REPO,
                {
                    repoName,
                    userName: this.store.state.gitHubData.userName,
                    perPage: landscapeConfig.maxSceneItems
                }
            );

            this.store.commit(mutationTypes.USED_DATA, {
                raw: this.store.state.gitHubData.commits[repoName].raw,
                mapped: this.store.state.gitHubData.commits[repoName].mapped,
                dataSrc: type
            });

            return Promise.resolve();
        }

        return Promise.reject(`Couldn´t find requested type`);
    }
}

export default LevelDataLoader;
