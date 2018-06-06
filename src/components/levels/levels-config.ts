import levelDataSources from './level-data-loader/level-data-sources';

export default {
    /**
     * all levels, added
     * to experiment.
     */
    allLevels:  [
        {
            index: 1,
            title: 'repositories',
            dataSrc: levelDataSources.REPOS
        },
        {
            index: 2,
            title: 'commits',
            dataSrc: levelDataSources.COMMITS
        }
    ]
};
