import chai, { expect } from 'chai';
import { stub } from 'sinon';

import {ComponentTest} from '../../util/component-test';

import Vue from 'vue';
import Vuex from 'vuex';

import {mutations, mutationTypes} from '../../store';

import { reposMappers, commitsMappers } from '../data-mapper/mappers';
import {diContainer, types} from '../dependency-injection';

import { LandscapeLegendComponent } from './landscape-legend';

describe('LandscapeLegend Component', () => {
    let componentTest: ComponentTest,
        store, state;

    before(() => {
        componentTest = new ComponentTest(
            '<landscape-legend ref="legend"></landscape-legend>',
            {
                'landscape-legend': LandscapeLegendComponent,
            }
        );

        state = {
          levels: {
              currentLevel: {
                  index: 1,
                  title: 'repositories',
                  dataSrc: 'repos'
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
            title: 'repositories',
            dataSrc: 'repos'
        }});
        componentTest.createComponent({store});

        await componentTest.execute((vm) => {
            // @ts-ignore
            expect(vm.$refs.legend.legendData[0].label).to.equal(reposMappers[0].mountainsParameter);
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
                expect(vm.$refs.legend.legendData.length).to.equal(reposMappers.length);
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
                expect(vm.$refs.legend.legendData[0].label).to.equal(commitsMappers[0].mountainsParameter);
                // @ts-ignore
                expect(vm.$refs.legend.legendData[0].value).to.equal('commits→size');
            });
        });
    });
});
