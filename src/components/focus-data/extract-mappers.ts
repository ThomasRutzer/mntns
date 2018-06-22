/**
 * strong bound mapper to extract
 * required specified data from
 * each data set. This extracted
 * data will be displayed in Modal
 * of intersected mntns, for example
 */
const extractFromRepos = {
    url: ['url'],
    title: ['name'],
    description: null
};

const extractFromCommits = {
    url: ['commit', 'url'],
    title: ['commit', 'message'],
    description: null
};

export {
    extractFromRepos,
    extractFromCommits
};
