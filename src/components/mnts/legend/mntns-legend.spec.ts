import chai, {expect} from 'chai';
import {stub} from 'sinon';

import {ComponentTest} from '../../../util/component-test';

import Vue from 'vue';
import Vuex from 'vuex';

import {mutations, mutationTypes} from './../../../store';

import { repoMappers, commitMappers } from '../../data-mapper/mappers';
import {diContainer, types} from '../../dependency-injection';

import { MntnsLegendComponent } from './mntns-legend';

describe('MntnsLegendComponent', () => {
    let componentTest: ComponentTest,
        store, state;

    before(() => {
        componentTest = new ComponentTest(
            '<mntns-legend ref="legend"></mntns-legend>',
            {
                'mntns-legend': MntnsLegendComponent,
            }
        );

        state = {
          levels: {
              currentLevel: {
                  index: 1,
                  title: 'repositories'
              }
          }
        };

        // stub DI
        stub(diContainer, 'get')
            .withArgs(types.Store).returns(new Vuex.Store({
            state,
            mutations
        }));

        store = diContainer.get(types.Store);
    });

    after(() => {
        // @ts-ignore
        // Property 'restore' does not exist on type '<T>(serviceIdentifier: string | symbol | Newable<T> | Abstract<T>) => T'.
        diContainer.get.restore();
    });

    it('outputs data based on mapper', async () => {
        store.commit(mutationTypes.UPDATE_LEVEL, { level: {
            index: 1,
            title: 'repositories'
        }});
        componentTest.createComponent({store});

        await componentTest.execute((vm) => {
            // @ts-ignore
            expect(vm.$refs.legend.legendData[0].label).to.equal(repoMappers[0].mountainsParameter);
            // @ts-ignore
            expect(vm.$refs.legend.legendData[0].value).to.equal('repositories→size');
        });
    });

    it('holds an item in legendData for each mapper', async () => {
        store.commit(mutationTypes.UPDATE_LEVEL, { level:   {
            index: 2,
            title: 'commits'
        }});
        componentTest.createComponent({store});

        await componentTest.execute((vm) => {

            Vue.nextTick(() => {
                // @ts-ignore
                expect(vm.$refs.legend.legendData.length).to.equal(repoMappers.length);
            });
        });
    });

    it('updates data when current level changes', async () => {
        store.commit(mutationTypes.UPDATE_LEVEL, { level: {
            index: 1,
            title: 'repositories'
        }});
        componentTest.createComponent({store});

        await componentTest.execute((vm) => {
            store.commit(mutationTypes.UPDATE_LEVEL, { level:   {
                  index: 2,
                  title: 'commits'
              }});

            Vue.nextTick(() => {
                // @ts-ignore
                expect(vm.$refs.legend.legendData[0].label).to.equal(commitMappers[0].mountainsParameter);
                // @ts-ignore
                expect(vm.$refs.legend.legendData[0].value).to.equal('commits→size');
            });
        });
    });
});
