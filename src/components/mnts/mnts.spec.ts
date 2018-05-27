import chai, {expect} from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import {stub} from 'sinon';
import {ComponentTest} from '../../util/component-test';

import Vue from 'vue';
import Vuex from 'vuex';

import {mutations, mutationTypes} from './../../store';

import {LevelProgress} from './../levels/level-progress/level-progress';

import rawRepos from './../../../mocks/github-repo-mock';
import rawCommits from './../../../mocks/github-commit-mock';

import {MntsComponent} from './mnts';
import {diContainer, types} from '../dependency-injection';

chai.use(chaiAsPromised);

const mappedRepos = [
    {
        id: 1,
    },
    {
        id: 2
    }
];
const mappedCommits = [];

describe('MntsCmponent', () => {
    let componentTest: ComponentTest,
        store, state;

    before(() => {
        // add some children comps
        Vue.component('level-progress', LevelProgress);
        Vue.directive('mousemove-follow', {});

        componentTest = new ComponentTest(
            '<mnts ref="mntns" m-id="1"></mnts>',
            {
                'mnts': MntsComponent,
            }
        );

        // mock Store.state
        state = {
            experimentContainer: {
                activated: false
            },

            currentRoute: {
                titleAnimatedIn: false
            },
            gitHubData: {
                repos: {
                    mapped: null,
                    raw: null,
                },
                usedData: {
                    raw: null,
                    mapped: null
                },
                focusedData: {
                    raw: {
                        name: 'any',
                        url: 'any'
                    },
                    event: {
                        x: 0,
                        y: 0,
                        type: null
                    }
                }
            },
            levels: {
                currentLevel: {
                    index: 1,
                    title: 'Repositories'
                }
            }
        };

        // stub DI
        stub(diContainer, 'get')
            .withArgs(types.Store).returns(new Vuex.Store({
              state,
              mutations
            }))
            .withArgs(types.LevelsServiceFactory).returns(() => {
              return {
                nextStep: () => {},
                previousStep: () => {},
                start: () => {
                    return Promise.resolve();
                }
              }})
            .withArgs(types.MntnsServiceFactory).returns(() => {
              return {
                focusData: (id: string) => {
                },
                setCameraToStart: () => {
                }
            }});

        console.log(diContainer.get(types.LevelsService))

        store = diContainer.get(types.Store);
    });

    after(() => {
        // @ts-ignore
        // Property 'restore' does not exist on type '<T>(serviceIdentifier: string | symbol | Newable<T> | Abstract<T>) => T'.
        diContainer.get.restore();
    });

    it('sets data, when title is animated in and data is mapped', async () => {
        componentTest.createComponent({store});

        await componentTest.execute((vm) => {
            store.commit(mutationTypes.CURRENT_TITLE_VISIBLE);
            store.commit(mutationTypes.STORE_GITHUB_REPOS, {rawRepos: rawRepos, mappedRepos: mappedRepos});

            // @ts-ignore Property 'onIntersection' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            //Property 'onIntersection' does not exist on type 'Vue'.
            expect(typeof vm.$refs.mntns.data).to.equal('object');
        });
    });

    it('initially deactivates ', async () => {
        componentTest.createComponent({store});

        await componentTest.execute((vm) => {
            expect(vm.$store.state.experimentContainer.activated).to.equal(false);
        });
    });

    it('clears detailed data section on any step back', async () => {
        componentTest.createComponent({store});

        await componentTest.execute((vm) => {
            // @ts-ignore Property 'onIntersection' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            //Property 'onIntersection' does not exist on type 'Vue'.
            vm.$refs.mntns.back();
            // @ts-ignore Property 'onIntersection' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            //Property 'onIntersection' does not exist on type 'Vue'.
            expect(vm.$refs.mntns.detailedData).to.equal(null);
        });
    });

    it('clears detailed data section on any step forwards', async () => {
        componentTest.createComponent({store});

        await componentTest.execute((vm) => {
            // @ts-ignore Property 'onIntersection' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            //Property 'onIntersection' does not exist on type 'Vue'.
            vm.$refs.mntns.back();
            // @ts-ignore Property 'onIntersection' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            //Property 'onIntersection' does not exist on type 'Vue'.
            expect(vm.$refs.mntns.detailedData).to.equal(null);
        });
    });

    it('filters proper focusedData when current level is 1', async() => {
        componentTest.createComponent({store});

        store.commit(mutationTypes.UPDATE_LEVEL, {
            level: {
                index: 1,
                title: 'Repositories'
            }
        });

        await componentTest.execute((vm) => {
            // @ts-ignore Property 'onIntersection' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            //Property 'onIntersection' does not exist on type 'Vue'.
            vm.$refs.mntns.updateDetailedData();
            // @ts-ignore Property 'onIntersection' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            //Property 'onIntersection' does not exist on type 'Vue'.
            expect(vm.$refs.mntns.detailedData.title).to.equal('any');
            // @ts-ignore Property 'onIntersection' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            //Property 'onIntersection' does not exist on type 'Vue'.
            expect(vm.$refs.mntns.detailedData.url.endsWith('any')).to.equal(true);
        });
    });

    it('filters proper focusedData when current level is 2', async() => {
        componentTest.createComponent({store});

        store.commit(mutationTypes.UPDATE_LEVEL, {
            level: {
                index: 2,
                title: 'Commits'
            }
        });

        store.commit(mutationTypes.FOCUS_REPO, {
            raw: rawCommits[0],
            mapped: mappedCommits[0]
        });

        await componentTest.execute((vm) => {
            // @ts-ignore Property 'onIntersection' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            //Property 'onIntersection' does not exist on type 'Vue'.
            vm.$refs.mntns.updateDetailedData();
            // @ts-ignore Property 'onIntersection' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            //Property 'onIntersection' does not exist on type 'Vue'.
            expect(vm.$refs.mntns.detailedData.title).to.equal('changed state.experimentContainer to its own object');
            // @ts-ignore Property 'onIntersection' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            //Property 'onIntersection' does not exist on type 'Vue'.
            expect(vm.$refs.mntns.detailedData.url).to.equal('https://github.com/thomasrutzer/mntns/commit/875670a38c40556f3c115dbeef1c4fd88cb240f2');
        });
    });

    it('closes detailed data when its open and another mousedown event occured', async () => {
        componentTest.createComponent({store});
        store.commit(mutationTypes.ACTIVATE_EXPERIMENT_CONTAINER);
        store.commit(mutationTypes.UPDATE_LEVEL, {
            level: 1
        });

        await componentTest.execute((vm) => {
            // @ts-ignore Property 'onIntersection' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            //Property 'onIntersection' does not exist on type 'Vue'.
            vm.$refs.mntns.focusedData = 'any';

            // @ts-ignore Property 'onIntersection' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            //Property 'onIntersection' does not exist on type 'Vue'.
            vm.$refs.mntns.onIntersection({
                object: {
                    name: 'any'
                },
                event: {
                    type: 'mousedown'
                }
            });

            // @ts-ignore Property 'onIntersection' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            //Property 'onIntersection' does not exist on type 'Vue'.
            expect(vm.$refs.mntns.focusedData).to.equal(null);
        });
    });

    it('just clears focused data when intersected object is any of excluded', async () => {
        componentTest.createComponent({store});
        store.commit(mutationTypes.ACTIVATE_EXPERIMENT_CONTAINER);

        await componentTest.execute((vm) => {
            // @ts-ignore Property 'onIntersection' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            //Property 'onIntersection' does not exist on type 'Vue'.
            vm.$refs.mntns.focusedData = 'any';

            // @ts-ignore Property 'onIntersection' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            //Property 'onIntersection' does not exist on type 'Vue'.
            vm.$refs.mntns.onIntersection({
                object: {
                    name: 'floor'
                }
            });

            // @ts-ignore Property 'onIntersection' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            //Property 'onIntersection' does not exist on type 'Vue'.
            expect(vm.$refs.mntns.focusedData).to.equal(null);
        });
    });
});
