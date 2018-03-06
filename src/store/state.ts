const state = {

    background: {
        /**
         * defines visibility of component, which Router
         * renders into router-view=background
         *
         * @property {number}
         * @value 0 background component is visibile in reduced size
         * @value 1 background is visible and expanded
         */
        visibility: 0,

        /**
         * whether background component is active or not.
         */
        activated: false,
    },

    currentRoute: {
        titleAnimatedIn: false
    },

    gitHubData: {
        startedLoading: null,
        finishedLoading: null,

        startedMapping: null,
        finishedMapping: null,

        /**
         * mapped repos to match mnts interface
         */
        mappedRepos: null,

        /**
         * stores retrieved repos from GitHub,
         */
        rawRepos: null,

        /**
         * repo which will be shown in detail
         * @type { Object }
         * @property { Object } raw data from Github
         * @property { Object } mapped Github repo data
         * @property  { Object } event typo of which triggers focus
         */
        focusedRepo: {
            raw: null,
            mapped: null,
            event: null
        },

        commits: {}
    },

    mntns: {
        level: 1
    }

};

export default state;