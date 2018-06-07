import { expect } from 'chai';
import Vuex from 'vuex';

import LevelsService from './levels-service';
import { actions, mutations } from './../../store';
import {LevelDataLoaderInterface} from './level-data-loader/level-data-loader-interface';

describe('Levels Service', () => {
    let levelsService,
        allLevels,
        store,
        levelDataLoader: LevelDataLoaderInterface;

    before(() => {
        allLevels = [
            {
                index: 1,
                title: 'first',
                dataSrc: 'repos'
            },
            {
                index: 2,
                title: 'second',
                dataSrc: 'commits'
            },
            {
                index: 3,
                title: 'third',
                dataSrc: 'repos'
            }
        ];
        store = new Vuex.Store({
            state: {
              levels: {
                  currentLevel: {
                      index: 1,
                      title: 'repositories'
                  }
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
        levelDataLoader = {
            loadByType() {
                return Promise.resolve();
            }
        };
        levelsService = new LevelsService(store, allLevels, levelDataLoader);
    });

    it('provides a method, with which others can start from first level', async () => {
        await levelsService.start();
        expect(store.state.levels.currentLevel.index).to.equal(1);
    });

    it('provides a method, with which others can request next level', async () => {
        await levelsService.nextStep();
        expect(store.state.levels.currentLevel).to.equal(allLevels[1]);
    });

    it('provides a method, with which others can request previous level', async () => {
        // assert it´s level with index 1
        await levelsService.start();
        // assert it´s level with index 2
        await levelsService.nextStep();
        //assert it´s level with index 3
        await levelsService.nextStep();
        // assert it´s level with index 2 again
        await levelsService.previousStep();
        expect(store.state.levels.currentLevel).to.equal(allLevels[1]);
    });
});
