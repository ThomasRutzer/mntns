import * as types from './mutation-types';

const mutations = {
    [types.EXPAND_BACKGROUND](state) {
        state.backgroundVisibility = 1;
    },

    [types.REDUCE_BACKGROUND](state) {
        state.backgroundVisibility = 0;
    },

    [types.CURRENT_TITLE_VISIBLE](state) {
        state.currentRoute.titleAnimatedIn = true
    },

    [types.CURRENT_TITLE_INVISIBLE](state) {
        state.currentRoute.titleAnimatedIn = false
    },

    [types.STORE_GITHUB_REPOS](state, payload) {
        console.log(payload)
        state.mappedRepos = payload;
    }

};

export default mutations;