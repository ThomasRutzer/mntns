import * as mutationTypes from './mutation-types';
import * as actionTypes from './action-types';

import { types, diContainer } from './../components/dependency-injection';
import { DataMapperInterface } from '../components/data-mapper/data-mapper-interface';
import * as mappers from '../components/data-mapper/mappers';
import { GithubApiClientInterface } from './../components/github-api-client';

/**
list of all provided action. An action is a plain Function,
which dispatches a commit, e.g.:
@see: https://vuex.vuejs.org/en/actions.html

export const addToCart = ({ commit }, product) => {
    if (product.inventory > 0) {
        store.commit(types.ADD_TO_CART, {
            id: product.id
        })
    }
};
**/

const actions = {

    /**
     * @param {Function} commit helper from Store
     * @param {Object} state of Store
     * @param {string} userName
     * @param {number} perPage
     * @return {Promise<void>}
     */
    async [actionTypes.RETRIEVE_GITHUB_REPOS] ({ commit, state }, { userName, perPage }) {
        let data;

        // currently, raw data shall only
        // load once, so we can check here
        if (!state.gitHubData.repos.raw) {
            const githubApiClient = diContainer.get<GithubApiClientInterface>(types.GithubApiClient);
            const dataMapper = diContainer.get<DataMapperInterface>(types.DataMapper);

            commit(mutationTypes.GITHUB_API_STARTED);

            const res = await githubApiClient.getUserRepos(userName, perPage)
                .catch((e) => {
                    commit(mutationTypes.GITHUB_API_LOADING_ERROR);
                    return Promise.reject(e);
                });

            commit(mutationTypes.GITHUB_DATA_MAPPING_STARTED);

            data = {
                mappedRepos: res ? dataMapper.map(res.data, mappers.repoMappers) : [],
                rawRepos: res ? res.data : []
            };

            commit(mutationTypes.GITHUB_DATA_MAPPING_FINISHED);
            commit(mutationTypes.GITHUB_API_FINISHED);
        } else {
            data = {
                mappedRepos: state.gitHubData.repos.mapped,
                rawRepos: state.gitHubData.repos.raw
            };
        }

        commit(mutationTypes.STORE_GITHUB_REPOS, data);
        return Promise.resolve();
    },

    /**
     * @param {Function} commit helper from Store
     * @param {Object} state of Store
     * @param {string} userName
     * @param {string} repoName
     * @param {number} perPage
     * @return {Promise<void>}
     */
    async [actionTypes.RETRIEVE_GITHUB_COMMITS_FOR_REPO] ({ commit, state }, { repoName, userName, perPage }) {
        let data;

        // any commits for certain repo shall only loaded once
        // so we can check for that
        if (!state.gitHubData.commits[repoName]) {
            const githubApiClient = diContainer.get<GithubApiClientInterface>(types.GithubApiClient);
            const dataMapper = diContainer.get<DataMapperInterface>(types.DataMapper);

            commit(mutationTypes.GITHUB_API_STARTED);

            const res = await githubApiClient.getCommits(repoName, userName, perPage)
                .catch((e) => {});

            commit(mutationTypes.GITHUB_DATA_MAPPING_STARTED);

            data = {
                mapped: res ? dataMapper.map(res.data, mappers.commitMappers) : [],
                raw: res ? res.data : []
            };

            commit(mutationTypes.GITHUB_DATA_MAPPING_FINISHED);
            commit(mutationTypes.GITHUB_API_FINISHED);
        } else {
            data = {
                mapped: state.gitHubData.commits[repoName].mapped,
                raw: state.gitHubData.commits[repoName].raw
            };
        }

        commit(mutationTypes.STORE_COMMIT, { ...data, repoName});
        return Promise.resolve();
    }
};

export default actions;
