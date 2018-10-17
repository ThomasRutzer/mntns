import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import Component from 'vue-class-component';
import { expect } from 'chai';
import { stub } from 'sinon';

import { ComponentTest } from '../../util/component-test';
import { FooterbarComponent } from './footerbar';
import RouterLink from './../router/Router-Link';
import { diContainer, types } from '../dependency-injection';

const links = [
    new RouterLink('Kontakt', '/contact'),
];

@Component({
    template: require('./footerbar.html')
})
class MockFooterbarComponent extends FooterbarComponent {
    constructor() {
        super();
        this.links = links;
    }
}

describe('Footer component', () => {
    let directiveTest: ComponentTest, store, state;
    let router: VueRouter;

    before(() => {
        Vue.use(VueRouter);
        directiveTest = new ComponentTest('<div><footerbar></footerbar></div>', { 'footerbar': MockFooterbarComponent });

        router = new VueRouter();

        state = {
            currentRoute: {
                footerVisible: true
            },
        };

        // stub DI
        stub(diContainer, 'get')
            .withArgs(types.Store).returns(new Vuex.Store({
            state,
        }));

        store = diContainer.get(types.Store);
    });

    after(() => {
        // @ts-ignore
        // Property 'restore' does not exist on type '<T>(serviceIdentifier: string | symbol | Newable<T> | Abstract<T>) => T'.
        diContainer.get.restore();
    });

    it('creates a list item for each Link in links', async () => {
        directiveTest.createComponent({ router, store });

        await directiveTest.execute((vm) => {
            expect(vm.$el.querySelectorAll('.footerbar__list li').length).to.equal(links.length);
        });
    });

    it('displays link name', async () => {
        directiveTest.createComponent({ router, store });

        await directiveTest.execute((vm) => {
            expect(vm.$el.querySelectorAll('.footerbar__list-item')[0].textContent).to.equal(links[0].name);
        });
    });
});