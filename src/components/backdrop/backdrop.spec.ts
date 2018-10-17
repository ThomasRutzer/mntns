import {expect} from 'chai';
import {stub} from 'sinon';

import Vue from 'vue';
import {ComponentTest} from '../../util/component-test';

import { diContainer, types } from '../dependency-injection';
import { BackdropComponent } from './backdrop';

describe('Backdrop', () => {
    let componentTest: ComponentTest,
        diContainerStub;

    before(() => {
        Vue.directive('mousemove-follow', {});

        diContainerStub = stub(diContainer, 'get')
            // creating a dumb MediaQueryService mock
            // which just returns a match
            .withArgs(types.MediaQueryService).returns({
                on: (breakpoint, callback) => {
                    callback({ matches: true });
                }
            })
            .withArgs(types.Breakpoints).returns({
                's': '480px',
                'm': '768px',
                'l': '1024px',
                'xl': '1440px'
            });

        componentTest = new ComponentTest(
            '<div><backdrop trigger-label="Label" ref="backdrop"></backdrop></div>',
            {'backdrop': BackdropComponent}
        );
    });

    after(() => {
        // @ts-ignore
        diContainer.get.restore();
    });

    it('sets given trigger label', async () => {
        componentTest.createComponent();

        await componentTest.execute((vm) => {
            expect(vm.$el.querySelectorAll('.backdrop__activation-trigger span')[0].textContent).to.equal('Label');
        });
    });

    it('deactivates mousemove interaction on requested breakpoints', async () => {
        componentTest.createComponent();

        await componentTest.execute((vm) => {
            // since MediaQueryService Mock says it matches
            // property shall be 1 for match
            // @ts-ignore  Property 'mousemoveActivated' does not exist on type 'Vue | Element | Vue[] | Element[]'.
            // Property 'mousemoveActivated' does not exist on type 'Vue'.
            expect(vm.$refs.backdrop.mousemoveActivated).to.equal(1);
        });
    });
});