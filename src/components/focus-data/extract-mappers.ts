/**
 * strong bound mapper to extract
 * required specified data from
 * each data set. This extracted
 * data will be displayed in Modal
 * of intersected mntns, for example
 */
import * as mappers from './../data-mapper/mappers';

const extractFromRepos = {
    url: ['url'],
    title: ['name'],
    description: null,
    ...extractRepoMappers()
};

const extractFromCommits = {
    url: ['commit', 'url'],
    title: ['commit', 'message'],
    description: null,
    ...extractCommitMappers()
};

function extractRepoMappers(): object {
    const result = {};
    mappers.reposMappers.map((mapper) => {
        result[mapper.mountainsParameter] = mapper.dataKey;
    });

    return result;
}

function extractCommitMappers(): object {
    const result = {};
    mappers.commitsMappers.map((mapper) => {
        result[mapper.mountainsParameter] = mapper.dataKey;
    });

    return result;
}

export {
    extractFromRepos,
    extractFromCommits
};
