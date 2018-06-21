import {ComponentTest} from '../../util/component-test';
import {expect} from 'chai';
import {spy, stub, assert} from 'sinon';
import Vuex from 'vuex';
import { mutations } from '../../store';
import { ModalComponent } from './modal';
import { diContainer, types } from './../dependency-injection';

describe('ModalComponent', () => {
    let componentTest: ComponentTest,
        store,
        registeredModals: string[] = []
    ;

    before(() => {
        stub(diContainer, 'get')
            .withArgs(types.ModalService).returns({
                register: (name: string) => {
                    registeredModals.push(name)
                },

                unregister(name: string) {
                    const index: number = registeredModals.indexOf(name);
                    if (index === -1) return;

                    registeredModals.splice(index, 1);
                }
            }
        );

        store = new Vuex.Store({
            state: {
                activeModal: null,
            },
            mutations
        });

        componentTest = new ComponentTest(
            '<modal name="test"></modal>',
            {
                'modal': ModalComponent,
            }
        );
    });

    afterEach(() => {
       registeredModals = [];
    });

    after(() => {
        // @ts-ignore
        // Property 'restore' does not exist on type '<T>(serviceIdentifier: string | symbol | Newable<T> | Abstract<T>) => T'.
        diContainer.get.restore();
    });

    it('registers itself to ModalService', async () => {
        componentTest.createComponent({store});

        await componentTest.execute((vm) => {
            expect(registeredModals[0]).to.equal('test');
        });
    });

    it('unregisters itself from ModalService after it gets destroyed', async () => {
        componentTest.createComponent({store});

        await componentTest.execute((vm) => {
            vm.$children[0].$destroy();
            expect(registeredModals.length).to.equal(0);
        });
    });

    it('activates module focusTrap on open', async () => {
        componentTest.createComponent({store});

        await componentTest.execute((vm) => {
            // @ts-ignore Property 'focusTrap' does not exist on type 'Vue'.
            const focusTrapSpy = spy(<any>vm.$children[0].focusTrap, 'activate');
            // @ts-ignore Property 'onOpen' does not exist on type 'Vue'.
            <any>vm.$children[0].onOpen();

            // need timeout because of
            // Vue.nextTick in ModalComponent
            setTimeout(() => {
                assert.called(focusTrapSpy);
                focusTrapSpy.restore();
            }, 0)
        });
    });

    it('deactivates module focusTrap on close', async () => {
        componentTest.createComponent({store});

        await componentTest.execute((vm) => {
            // @ts-ignore Property 'focusTrap' does not exist on type 'Vue'.
            const focusTrapSpy = spy(<any>vm.$children[0].focusTrap, 'deactivate');
            // @ts-ignore Property 'onClose' does not exist on type 'Vue'.
            <any>vm.$children[0].onClose();

            // need timeout because of
            // Vue.nextTick in ModalComponent
            setTimeout(() => {
                assert.called(focusTrapSpy);
                focusTrapSpy.restore();
            }, 0)
        });
    });
});