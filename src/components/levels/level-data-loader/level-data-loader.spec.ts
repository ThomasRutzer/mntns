import { stub, assert } from 'sinon';
import { expect } from 'chai';
import Vuex from 'vuex';

import {actions, actionTypes, mutations} from './../../../store';
import LevelDataLaoder from './level-data-loader';
import {LevelDataLoaderInterface} from "./level-data-loader-interface";

describe('Level Data Loader', () => {
    let store, service: LevelDataLoaderInterface;

    before(() => {
        store = new Vuex.Store({
            state: {
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

        service = new LevelDataLaoder(store);
    });

    it('dispatches action which matches requested type', async () => {
        const actionStub = stub(store, 'dispatch').withArgs(actionTypes.RETRIEVE_GITHUB_REPOS);

        await service.loadByType('repos');
        store.dispatch.restore();
        assert.called(actionStub);
    });
});
