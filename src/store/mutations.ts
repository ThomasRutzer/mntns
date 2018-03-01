import * as types from './mutation-types';

const mutations = {
    [types.EXPAND_BACKGROUND](state) {
        state.background.visibility = 1;
    },

    [types.REDUCE_BACKGROUND](state) {
        state.background.visibility = 0;
    },

    [types.CURRENT_TITLE_VISIBLE](state) {
        state.currentRoute.titleAnimatedIn = true
    },

    [types.CURRENT_TITLE_INVISIBLE](state) {
        state.currentRoute.titleAnimatedIn = false
    },

    [types.STORE_GITHUB_REPOS](state, payload) {
        state.mappedRepos = payload.mappedRepos;
        state.rawRepos = payload.rawRepos;
    }

};

export default mutations;