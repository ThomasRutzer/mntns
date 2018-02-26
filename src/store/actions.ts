import * as mutationTypes from './mutation-types'
import * as actionTypes from './action-types';

import { types, diContainer } from "./../components/dependency-injection";
import { MntsDataMapperInterface } from "./../components/mnts/mnts-data-mapper-interface";
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
    async [actionTypes.RETRIEVE_GITHUB_REPOS] ({ commit, state }) {
        let data;

        if (!state.mappedRepos) {
            const githubApiClient = diContainer.get<GithubApiClientInterface>(types.GithubApiClient);
            const dataMapper = diContainer.get<MntsDataMapperInterface>(types.MntsDataMapper);

            const res = await githubApiClient.getUserRepos('thomasrutzer');
            data = dataMapper.mapRepos(res.data);
        } else {
            data = state.mappedRepos;
        }

        commit(mutationTypes.STORE_GITHUB_REPOS, data);
    }
};

export default actions;
