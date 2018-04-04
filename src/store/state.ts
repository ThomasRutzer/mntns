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

        /**
         * if true, css-prop pointer-events none will be
         * applied to content area
         */
        clickable: true
    },

    currentRoute: {
        titleAnimatedIn: false
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

    mntns: {
        levels: {
            currentLevel: 1,
            allLevels:  [
                {
                    index: 1,
                    title: 'Repositories'
                },
                {
                    index: 2,
                    title: 'Commits'
                }
            ]
        }
    }

};

export default state;