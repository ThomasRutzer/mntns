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
    },

    currentRoute: {
        titleAnimatedIn: false
    },

    /**
     * mapped repos to match mnts interface
     */
    mappedRepos: null,

    /**
     * stores retrieved repos from GitHub,
     */
    rawRepos:null,
};

export default state;