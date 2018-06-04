import { expect } from 'chai';
import Vuex from 'vuex';
import {actions, mutations, mutationTypes} from '../../store';

import * as GeneratorModule from 'mntns-landscape/src/components/generator';
import FocusDataService from './focus-data-service';

import rawRepos from './../../../mocks/github-repo-mock';
import rawCommits from './../../../mocks/github-commit-mock';
const mappedRepos = [
    {
        id: 87546623,
    },
    {
        id: 118357197
    }
];
const mappedCommits = [];

describe('Focus Data Service', () => {
    let service, store;

    before(() => {
        store = new Vuex.Store({
            state: {
                levels: {
                    currentLevel: {
                        index: 1,
                        title: 'repositories'
                    },
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
                        event: null
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
            },
            actions,
            mutations
        });

        const generatorManager = GeneratorModule.GeneratorManagerFactory.create('test');
        service = new FocusDataService(store, generatorManager);
    });

    describe('method focusData()', () => {
        it('when level is 1, focused data is repo', async () => {
            store.commit(mutationTypes.USED_DATA, {
                raw: rawRepos,
                mapped: mappedRepos
            });

            await service.focusData("87546623");
            expect(store.state.gitHubData.focusedData.raw).to.equal(rawRepos[0]);
        });

        it('when level is 2, focused data is commit', async () => {

            store.commit(mutationTypes.USED_DATA, {
                raw: rawCommits,
                mapped: mappedCommits
            });

            store.commit(mutationTypes.UPDATE_LEVEL, {level: {
                index: 2,
                title: 'commits'
            }});

            await service.focusData("875670a38c40556f3c115dbeef1c4fd88cb240f2");
            expect(store.state.gitHubData.focusedData.raw).to.equal(rawCommits[0]);
        });

        it('unfocus data, when called with unmatchind argument ID', async () => {
            await service.focusData("1001");
            expect(store.state.gitHubData.focusedData.raw).to.equal(null);
            expect(store.state.gitHubData.focusedData.mapped).to.equal(null);
        });
    });
});
