import chai, { expect } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
import { stub, assert, spy } from 'sinon';
import { ComponentTest } from '../../util/component-test';

import Vue from 'vue';
import Vuex from 'vuex';

import {mutations, mutationTypes} from './../../store';
import {LevelProgress} from './../levels/level-progress/level-progress';

import rawRepos from './../../../mocks/github-repo-mock';

import {MntsComponent} from './mnts';
import {diContainer, types} from '../dependency-injection';

const mappedRepos = [
    {
        id: 1,
    },
    {
        id: 2
    }
];

describe('MntsCmponent', () => {
    let componentTest: ComponentTest,
        modalCloseCalled: boolean = false,
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
            .withArgs(types.FocusDataService).returns({
                commitFocusedData: () => {}
            })
            .withArgs(types.ModalService).returns({
                close: () => {
                    modalCloseCalled = true;
                },
                open: () => {}
            })
            .withArgs(types.LevelsServiceFactory).returns(() => {
                return {
                    nextStep: () => {},
                    previousStep: () => {},
                    start: () => {
                        return Promise.resolve();
                    }
                }});


        store = diContainer.get(types.Store);
    });

    after(() => {
        // @ts-ignore
        // Property 'restore' does not exist on type '<T>(serviceIdentifier: string | symbol | Newable<T> | Abstract<T>) => T'.
        diContainer.get.restore();
    });

    afterEach(() => {
       modalCloseCalled = false;
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

    it('closes modal on step back', async () => {
        componentTest.createComponent({store});

        await componentTest.execute((vm) => {
            // @ts-ignore
            const clearDataSpy = spy(vm.$children[0], 'clearDetailedData');

            // @ts-ignore Property 'onIntersection' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            //Property 'onIntersection' does not exist on type 'Vue'.
            vm.$refs.mntns.back();

            assert.called(clearDataSpy);

            clearDataSpy.restore();
        });
    });

    it('closes modal on step forwards', async () => {
        componentTest.createComponent({store});

        await componentTest.execute((vm) => {
            /// @ts-ignore
            const clearDataSpy = spy(vm.$children[0], 'clearDetailedData');

            // @ts-ignore Property 'onIntersection' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            //Property 'onIntersection' does not exist on type 'Vue'.
            vm.$refs.mntns.forwards();

            assert.called(clearDataSpy);

            clearDataSpy.restore();
        });
    });

    it('closes modal when intersected object is any of excluded', async () => {
        componentTest.createComponent({store});
        store.commit(mutationTypes.ACTIVATE_EXPERIMENT_CONTAINER);

        await componentTest.execute((vm) => {
            // @ts-ignore Property 'onIntersection' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            //Property 'onIntersection' does not exist on type 'Vue'.
            vm.$refs.mntns.onIntersection({
                object: {
                    name: 'floor'
                }
            });

            // @ts-ignore Property 'onIntersection' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            //Property 'onIntersection' does not exist on type 'Vue'.
            expect(vm.$refs.mntns.activeModal).to.equal(false);
        });
    });
});
