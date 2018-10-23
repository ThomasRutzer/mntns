import { StateInterface } from './state-interface';

const state: StateInterface = {

    experimentContainer: {
        visibility: 0,
        activated: false,
        legend: null
    },

    currentRoute: {
        titleAnimatedIn: false,
        footerVisible: true
    },

    gitHubData: {
        userName: 'thomasrutzer',

        startedLoading: null,
        finishedLoading: null,
        loadingError: null,

        startedMapping: null,
        finishedMapping: null,

        focusedData: {
            raw: null,
            mapped: null,
            id: null,
            extracted: null
        },

        usedData: {
            raw: null,
            mapped: null,
            dataSrc: null
        },

        repos: {},

        commits: {}
    },

    levels: {
        currentLevel: null,
    },

    activeModal: null
};

export default state;
