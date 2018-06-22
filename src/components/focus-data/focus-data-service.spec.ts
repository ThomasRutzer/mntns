import { expect } from 'chai';
import Vuex from 'vuex';
import {actions, mutations, mutationTypes} from '../../store';

import FocusDataService from './focus-data-service';
import {FocusDataServiceInterface} from "./focus-data-service-interface";

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
    let service: FocusDataServiceInterface, store;

    before(() => {
        store = new Vuex.Store({
            state: {
                levels: {
                    currentLevel: {
                        index: 1,
                        title: 'repositories',
                        dataSrc: 'repos'
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
                        extracted: null,
                        id: null
                    },
                    usedData: {
                        raw: null,
                        mapped: null,
                        dataSrc: null
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

        service = new FocusDataService(store);
    });

    describe('method commitFocusedData()', () => {
        it('when level is 1, focused data is repo', async () => {
            store.commit(mutationTypes.USED_DATA, {
                raw: rawRepos,
                mapped: mappedRepos,
                dataSrc: 'repos'
            });

            await service.commitFocusedData("87546623");
            expect(store.state.gitHubData.focusedData.raw).to.equal(rawRepos[0]);
        });

        it('when level is 2, focused data is commit', async () => {

            store.commit(mutationTypes.USED_DATA, {
                raw: rawCommits,
                mapped: mappedCommits,
                dataSrc: 'commits'
            });

            store.commit(mutationTypes.UPDATE_LEVEL, {level: {
                index: 2,
                title: 'commits',
                dataSrc: 'commits'
            }});

            await service.commitFocusedData("875670a38c40556f3c115dbeef1c4fd88cb240f2");
            expect(store.state.gitHubData.focusedData.raw).to.equal(rawCommits[0]);
        });

        it('unfocus data, when called with unmatchind argument ID', async () => {
            await service.commitFocusedData("1001");
            expect(store.state.gitHubData.focusedData.raw).to.equal(null);
            expect(store.state.gitHubData.focusedData.mapped).to.equal(null);
        });

        it('commits expected extracted data for given dataSrc', async () => {
            await service.commitFocusedData("1001");
            expect(store.state.gitHubData.focusedData.extracted.title).to.equal('changed state.experimentContainer to its own object');
            expect(store.state.gitHubData.focusedData.extracted.url).to.equal('https://api.github.com/repos/ThomasRutzer/portfolio/git/commits/875670a38c40556f3c115dbeef1c4fd88cb240f2');
            expect(store.state.gitHubData.focusedData.extracted.description).to.equal(null);
        });
    });
});
