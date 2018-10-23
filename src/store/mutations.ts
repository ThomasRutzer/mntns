import * as types from './mutation-types';

const mutations = {
    [types.EXPAND_EXPERIMENT_CONTAINER](state) {
        state.experimentContainer.visibility = 1;
    },

    [types.REDUCE_EXPERIMENT_CONTAINER](state) {
        state.experimentContainer.visibility = 0;
    },

    [types.ACTIVATE_EXPERIMENT_CONTAINER](state) {
        state.experimentContainer.activated = true;
    },

    [types.DEACTIVATE_EXPERIMENT_CONTAINER](state) {
        state.experimentContainer.activated = false;
    },

    [types.CURRENT_TITLE_VISIBLE](state) {
        state.currentRoute.titleAnimatedIn = true;
    },

    [types.CURRENT_TITLE_INVISIBLE](state) {
        state.currentRoute.titleAnimatedIn = false;
    },

    [types.FOOTER_VISIBLE](state, payload: boolean) {
        state.currentRoute.footerVisible = payload;
    },

    [types.CHANGE_GITHUB_USERNAME](state, payload) {
        state.gitHubData.userName = payload.userName;
    },

    [types.GITHUB_API_STARTED](state) {
        state.gitHubData.startedLoading = true;
        state.gitHubData.finishedLoading = false;
    },

    [types.GITHUB_API_FINISHED](state) {
        state.gitHubData.startedLoading = false;
        state.gitHubData.finishedLoading = true;
        state.gitHubData.loadingError = false;
    },

    [types.GITHUB_API_LOADING_ERROR](state) {
        state.gitHubData.loadingError = true;
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
        state.gitHubData.repos[payload.userName] = {
            mapped: payload.mappedRepos,
            raw: payload.rawRepos
        };
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
        state.gitHubData.focusedData.extracted = payload.extracted;
    },

    [types.UNFOCUS_REPO](state) {
        state.gitHubData.focusedData.raw = null;
        state.gitHubData.focusedData.mapped = null;
        state.gitHubData.focusedData.event = null;
    },

    [types.UPDATE_LEVEL](state, { level }) {
        state.levels.currentLevel = level;
    },

    [types.USED_DATA](state, payload) {
        state.gitHubData.usedData.raw = payload.raw;
        state.gitHubData.usedData.mapped = payload.mapped;
        state.gitHubData.usedData.dataSrc = payload.dataSrc;
    },

    [types.OPEN_MODAL](state, payload) {
        state.activeModal = payload.name;
    },

    [types.CLOSE_MODAL](state) {
        state.activeModal = null;
    },

    [types.STORE_LEGEND](state, payload) {
        state.experimentContainer.legend = payload;
    }
};

export default mutations;
