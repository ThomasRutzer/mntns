/**
 * class to load data source
 * defined in LevelModel
 */
import { injectable, inject } from 'inversify';
import types from './../../dependency-injection/types';
import { actionTypes } from './../../../store';
import { Store } from 'vuex';
import { LevelDataLoaderInterface } from './level-data-loader-interface';
import landscapeConfig from './../../mnts/mnts-config';
import { gitHubConfig } from './../../github-api-client';
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
                    userName: gitHubConfig.gitHubUsername,
                    perPage: landscapeConfig.maxSceneItems
                }
            );

            return Promise.resolve();
        }

        if (type === levelDataSources.COMMITS) {
            const repoName = this.store.state.gitHubData.focusedData.raw.name;

            await this.store.dispatch(
                actionTypes.RETRIEVE_GITHUB_COMMITS_FOR_REPO,
                {
                    repoName,
                    userName: gitHubConfig.gitHubUsername,
                    perPage: landscapeConfig.maxSceneItems
                }
            );

            return Promise.resolve();
        }

        return Promise.reject(`Couldn´t find requested type`);
    }
}

export default LevelDataLoader;