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
        state.gitHubData.repos.mapped = payload.mappedRepos;
        state.gitHubData.repos.raw = payload.rawRepos;
    },

    [types.STORE_COMMIT](state, payload) {
        state.gitHubData.commits[payload.repoName] = {
            mapped: payload.mapped,
            raw: payload.raw
        };
    },

    [types.FOCUS_REPO](state, payload) {
        state.gitHubData.focusedData.raw = payload.raw;
        state.gitHubData.focusedData.mapped = payload.mapped;
        state.gitHubData.focusedData.event = payload.event;
    },

    [types.UNFOCUS_REPO](state) {
        state.gitHubData.focusedData.raw = null;
        state.gitHubData.focusedData.mapped = null;
        state.gitHubData.focusedData.event = null;
    },

    [types.MNTNS_UPDATE_LEVEL](state, { level }) {
        state.mntns.levels.currentLevel = level;
    },

    [types.USED_DATA](state, payload) {
        state.gitHubData.usedData.raw = payload.raw;
        state.gitHubData.usedData.mapped = payload.mapped;
    }

};

export default mutations;