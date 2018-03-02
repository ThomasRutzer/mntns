import * as mutationTypes from './mutation-types'
import * as actionTypes from './action-types';

import { types, diContainer } from "./../components/dependency-injection";
import { MntsDataMapperInterface } from "../components/mnts-data-mapper/mnts-data-mapper-interface";
import mappers from './../components/mnts-data-mapper/mappers';
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
            const dataMapper = diContainer.get<MntsDataMapperInterface>(types.MntsDataMapper);

            commit(mutationTypes.GITHUB_API_STARTED);

            const res = await githubApiClient.getUserRepos(userName)
                .catch((e) => {

                });

            commit(mutationTypes.GITHUB_DATA_MAPPING_STARTED);

            data = {
                mappedRepos: res ? dataMapper.mapRepos(res.data, mappers): [],
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
    }
};

export default actions;
