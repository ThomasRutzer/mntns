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
        state.background.activated = false;
    },

    [types.CURRENT_TITLE_VISIBLE](state) {
        state.currentRoute.titleAnimatedIn = true
    },

    [types.CURRENT_TITLE_INVISIBLE](state) {
        state.currentRoute.titleAnimatedIn = false
    },

    [types.GITHUB_API_STARTED](state) {
        state.gitHubData.startedLoading = true;
        state.gitHubData.finishedLoading = false;
    },

    [types.GITHUB_API_FINISHED](state) {
        state.gitHubData.startedLoading = false;
        state.gitHubData.finishedLoading = true;
    },

    [types.GITHUB_DATA_MAPPING_STARTED](state) {
        state.gitHubData.startedMapping = true;
        state.gitHubData.finishedMapping = false;
    },

    [types.GITHUB_DATA_MAPPING_FINISHED](state) {
        state.gitHubData.startedMapping = false;
        state.gitHubData.finishedMapping = true;
    },

    [types.STORE_GITHUB_REPOS](state, payload) {
        state.gitHubData.mappedRepos = payload.mappedRepos;
        state.gitHubData.rawRepos = payload.rawRepos;
    },

    [types.STORE_COMMIT](state, payload) {
        state.gitHubData.commits[payload.repoName] = {
            mapped: payload.mapped,
            raw: payload.raw
        };
    },

    [types.FOCUS_REPO](state, payload) {
        state.gitHubData.focusedRepo.raw = payload.raw;
        state.gitHubData.focusedRepo.mapped = payload.mapped;
        state.gitHubData.focusedRepo.event = payload.event;
    },

    [types.UNFOCUS_REPO](state) {
        state.gitHubData.focusedRepo.raw = null;
        state.gitHubData.focusedRepo.mapped = null;
        state.gitHubData.focusedRepo.event = null;
    }

};

export default mutations;