import { expect } from 'chai';
import { spy, stub, assert } from 'sinon';

import Vue from 'vue';
import Vuex from 'vuex';

import {diContainer, types} from './../dependency-injection';
import {ComponentTest} from '../../util/component-test';

import {mutationTypes, mutations} from './../../store';
import titleTypoAnimation from './title-typo-animation-directive';

describe('titleTypoAnimation', () => {
    let store,
        state,
        componentTest: ComponentTest;

    before(() => {
        state = {
            currentRoute: {
                titleAnimatedIn: false
            },
        };

        stub(diContainer, 'get').withArgs(types.Store).returns(new Vuex.Store({
            state,
            mutations
        }));

        store = diContainer.get(types.Store);

        Vue.directive('title-animation', titleTypoAnimation);
        componentTest = new ComponentTest('<div v-title-animation="{tween: false}">Test with four words</div>', null);
    });

    after(() => {
        // @ts-ignore
        diContainer.get.restore();
    });

    it('initially commits to store, that current title is invisible', async () => {
        const commitSpy = stub(store, 'commit').withArgs(mutationTypes.CURRENT_TITLE_INVISIBLE);
        componentTest.createComponent({ store });

        await componentTest.execute((vm) => {
            assert.called(commitSpy);
            store.commit.restore();
        });
    });

    it('commits to store, that current title is visible after animation is completed', async () => {
        componentTest.createComponent({store});
        await componentTest.execute((vm) => {
            expect(vm.$store.state.currentRoute.titleAnimatedIn).to.equal(true);
        });
    });

    it('wraps each word of inner text into a span', async () => {
        componentTest.createComponent({store});
        await componentTest.execute((vm) => {
            expect(vm.$el.children.length).to.equal(4);
        });
    });

    it('all wrapped spans but last one hold &nbsp', async () => {
        componentTest.createComponent({store});
        await componentTest.execute((vm) => {

            Array.from(vm.$el.children).forEach((child, i) => {
                if (i > vm.$el.children.length) {
                    // @ts-ignore Property 'innerText' does not exist on type 'Element'.
                    expect(child.innerText.includes('&nbsp')).to.equal(true);
                } else {
                    // @ts-ignore Property 'innerText' does not exist on type 'Element'.
                    expect(child.innerText.includes('&nbsp')).to.equal(false);
                }
            });
        });
    });
});
