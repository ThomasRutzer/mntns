import * as mutationTypes from './mutation-types'
import * as actionTypes from './action-types';

import { types, diContainer } from "./../components/dependency-injection";
import { DataMapperInterface } from "../components/data-mapper/data-mapper-interface";
import * as mappers from '../components/data-mapper/mappers';
import { GithubApiClientInterface } from "./../components/github-api-client";

/*
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
*/

const actions = {
    async [actionTypes.RETRIEVE_GITHUB_REPOS] ({ commit, state }, userName) {
        let data;

        if (!state.gitHubData.mappedRepos) {
            const githubApiClient = diContainer.get<GithubApiClientInterface>(types.GithubApiClient);
            const dataMapper = diContainer.get<DataMapperInterface>(types.DataMapper);

            commit(mutationTypes.GITHUB_API_STARTED);

            const res = await githubApiClient.getUserRepos(userName)
                .catch((e) => {});

            commit(mutationTypes.GITHUB_DATA_MAPPING_STARTED);

            data = {
                mappedRepos: res ? dataMapper.map(res.data, mappers.repoMappers): [],
                rawRepos: res ? res.data : []
            };

            commit(mutationTypes.GITHUB_DATA_MAPPING_FINISHED);
            commit(mutationTypes.GITHUB_API_FINISHED);
        } else {
            data = {
                mappedRepos: state.gitHubData.mappedRepos,
                rawRepos: state.gitHubData.rawRepos
            };
        }

        commit(mutationTypes.STORE_GITHUB_REPOS, data);
        return Promise.resolve();
    },

    async [actionTypes.RETRIEVE_GITHUB_COMMITS_FOR_REPO] ({ commit, state }, { repoName, userName }) {
        let data;

        if (!state.gitHubData.commits[repoName]) {
            const githubApiClient = diContainer.get<GithubApiClientInterface>(types.GithubApiClient);
            const dataMapper = diContainer.get<DataMapperInterface>(types.DataMapper);

            commit(mutationTypes.GITHUB_API_STARTED);

            const res = await githubApiClient.getCommits(repoName, userName)
                .catch((e) => {});

            commit(mutationTypes.GITHUB_DATA_MAPPING_STARTED);

            data = {
                mapped: res ? dataMapper.map(res.data, mappers.commitMappers): [],
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
