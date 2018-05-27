const state = {

    experimentContainer: {
        /**
         * defines visibility of component, which Router
         * renders into router-view=experimentContainer
         *
         * @property {number}
         * @value 0 experimentContainer component is visible in reduced size
         * @value 1 experimentContainer is visible and expanded
         */
        visibility: 0,

        /**
         * whether experimentContainer component is active or not.
         */
        activated: false,

        /**
         * if true, css-prop pointer-events none will be
         * applied to content area
         */
        clickable: true
    },

    /**
    * route specifc data
    */  
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

        /**
         * repo which will be shown in detail
         * @type { Object }
         * @property { Object } raw data
         * @property { Object } mapped data
         * @property  { Object } event type which triggered focus
         */
        focusedData: {
            raw: null,
            mapped: null,
            event: null
        },

        /**
         * dataset, visualized by mntns
         */
        usedData: {
            raw: null,
            mapped: null
        },

        repos: {
            /**
             * mapped repos to match mnts interface
             */
            mapped: null,

            /**
             * stores retrieved repos from GitHub,
             */
            raw: null,
        },

        commits: {}
    },

    levels: {
        /**
         * @type LevelModel
         */
        currentLevel: null,
    }
};

export default state;
