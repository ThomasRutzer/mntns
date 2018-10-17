import { stub, assert } from 'sinon';
import { expect } from 'chai';
import Vuex from 'vuex';

import { actions, actionTypes, mutations, mutationTypes } from './../../../store';
import LevelDataLaoder from './level-data-loader';
import { LevelDataLoaderInterface } from "./level-data-loader-interface";
import rawRepos from './../../../../mocks/github-repo-mock';
const mappedRepos = [{id: 1}, {id: 2}];

describe('LevelDataLoader', () => {
    let store, service: LevelDataLoaderInterface;

    before(() => {
        store = new Vuex.Store({
            state: {
                gitHubData: {
                    userName: 'test',
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
                    repos: {},
                    commits: {}
                },
            },
            actions,
            mutations
        });

        service = new LevelDataLaoder(store);
    });

    it('dispatches action which matches requested type', async () => {
        const actionStub = stub(store, 'dispatch')
            .withArgs(actionTypes.RETRIEVE_GITHUB_REPOS)
            .callsFake(() => {
                //fake that some data is found and committed
                store.commit(mutationTypes.STORE_GITHUB_REPOS, {
                    userName: 'test',
                    rawRepos: rawRepos,
                    mappedRepos: mappedRepos
                });
            });
        ;
        await service.loadByType('repos');

        assert.called(actionStub);
        store.dispatch.restore();
    });
});
