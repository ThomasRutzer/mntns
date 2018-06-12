import { StateInterface } from './state-interface';

const state: StateInterface = {

    experimentContainer: {
        visibility: 0,
        activated: false,
        clickable: true
    },

    currentRoute: {
        titleAnimatedIn: false,
        footerVisible: true
    },

    gitHubData: {
        startedLoading: null,
        finishedLoading: null,
        loadingError: null,

        startedMapping: null,
        finishedMapping: null,

        focusedData: {
            raw: null,
            mapped: null,
        },

        usedData: {
            raw: null,
            mapped: null
        },

        repos: {
            mapped: null,
            raw: null,
        },

        commits: {}
    },

    levels: {
        currentLevel: null,
    }
};

export default state;
