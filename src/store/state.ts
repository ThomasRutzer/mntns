const state = {
    /**
     * defines visibility of component, which Router
     * renders into router-view=background
     *
     * @property {number}
     * @value 0 background component is visibile in reduced size
     * @value 1 background is visible and expanded
     */
    backgroundVisibility: 0,

    currentRoute: {
        titleAnimatedIn: false
    },

    /**
     * stores retrieved repos from GitHub,
     * already mapped to match mnts interface
     */
    mappedRepos: null,
};

export default state;