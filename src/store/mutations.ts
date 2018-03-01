import * as types from './mutation-types';

const mutations = {
    [types.EXPAND_BACKGROUND](state) {
        state.background.visibility = 1;
    },

    [types.REDUCE_BACKGROUND](state) {
        state.background.visibility = 0;
    },

    [types.ACTIVATE_BACKGROUND](state) {
        state.background.activated = true;
    },

    [types.DEACTIVATE_BACKGROUND](state) {
        state.background.deactivated = false;
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
    },

    [types.FOCUS_REPO](state, payload) {
        state.focusedRepo.raw = payload.raw;
        state.focusedRepo.mapped = payload.mapped;
        state.focusedRepo.event = payload.event;
    },

    [types.UNFOCUS_REPO](state) {
        state.focusedRepo.raw = null;
        state.focusedRepo.mapped = null;
        state.focusedRepo.event = null;
    }

};

export default mutations;