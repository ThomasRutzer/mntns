import { expect } from 'chai';
import { spy, assert } from 'sinon';
import Vuex from 'vuex';
import { mutations } from '../../store';
import { ModalServiceInterface } from './modal-service-interface';
import ModalService from './modal-service';
import diContainer from "../dependency-injection/container";

describe('Modal Service', () => {
    let service: ModalServiceInterface,
        store
    ;

    beforeEach(() => {
        store = new Vuex.Store({
            state: {
                activeModal: null,
            },
            mutations
        });

        service = new ModalService(store);
    });

    afterEach(() => {
        service = null;
    });

    it('provides a method where ModalComponents can register', () => {
        service.register('any');
        expect(service.getRegistered().indexOf('any') !== -1).to.equal(true);
    });

    it('provides a method where previously added ModalComponents can be unregistered', () => {
        service.register('any');
        expect(service.getRegistered().indexOf('any') !== -1).to.equal(true);
        service.unregister('any');
        expect(service.getRegistered().indexOf('any') !== -1).to.equal(false);
    });

    it('provides where a method which exposes all registered modals', () => {
        service.register('any');
        service.register('anyOther');
        const registerd = service.getRegistered();

        expect(registerd.length).to.equal(2);
        expect(registerd[0]).to.equal('any');
        expect(registerd[1]).to.equal('anyOther');
    });

    it('commits opened modal to vuex store', () => {
        service.register('any');
        service.open('any');

        expect(store.state.activeModal).to.equal('any');
    });

    it('any modal can only be registered once', () => {
        const logSpy = spy(console, 'log');
        service.register('any');
        service.register('any');

        assert.calledWith(logSpy, `Modal with id: "any" already registered`);
        expect(service.getRegistered().length).to.equal(1);

        logSpy.restore();
    });

    it('provides a method, where any Element can open a modal when it knows its name', () => {
        service.register('any');
        service.open('any');
        // @ts-ignore
        expect(<any>service.openModal).to.equal('any');
    });

    it('can only open registered modals', () => {
        service.open('any');
        // @ts-ignore
        expect(<any>service.openModal).to.equal(null);
    });

    it('provides a method, where any Element can close previously opened modals', () => {
        service.register('any');
        service.open('any');
        // @ts-ignore
        expect(<any>service.openModal).to.equal('any');

        service.close();
        // @ts-ignore
        expect(<any>service.openModal).to.equal(null);
    });

    it('closes any open modals before opens new one', () => {
        let closeSpy = spy(ModalService.prototype, 'close');
        service.register('any');
        service.register( 'anyOther');
        service.open('any');
        service.open('anyOther');

        assert.called(closeSpy);
        closeSpy = null;
    });

    it('stores last focused element when opening a modal', () => {
        let activeElement = document.createElement('a');
        activeElement.title = 'my title text';
        activeElement.href = 'image.png';
        activeElement.id = 'cool';

        document.body.appendChild(activeElement);
        activeElement.focus();

        service.register('any');
        service.open('any');

        // @ts-ignore Property 'lastFocus' does not exist on type 'ModalServiceInterface'.
        expect(<any>service.lastFocus).to.equal(activeElement);
    });

    it('focus last focused element after closing modal', () => {
        let activeElement = document.createElement('a');
        activeElement.title = 'my title text';
        activeElement.href = 'image.png';
        activeElement.id = 'otherLink';

        document.body.appendChild(activeElement);
        activeElement.focus();

        service.register('any');
        service.open('any');
        service.close();

        // @ts-ignore Property 'lastFocus' does not exist on type 'ModalServiceInterface'.
        expect(document.activeElement).to.equal(activeElement);
    });

    it('binds to window popstate event and closes, when its triggered', (done) => {
        service.register('any');
        service.open('any');

        history.go(-1);

        // needed timeput to trigger expect after event callback
        // for 'popstate' has been executed
        setTimeout(() => {
            // @ts-ignore Property 'openModal' does not exist on type 'ModalServiceInterface'.
            expect(<any>service.openModal).to.equal(null);
            done();
        }, 10)
    });
});
