import Vue from 'vue';
import VueRouter from 'vue-router';
import Component from 'vue-class-component';
import { expect } from 'chai';
import { ComponentTest } from '../../util/component-test';
import { FooterbarComponent } from './footerbar';
import { RouterLink } from './../router/';

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
    let directiveTest: ComponentTest;
    let router: VueRouter;

    beforeEach(() => {
        Vue.use(VueRouter);
        directiveTest = new ComponentTest('<div><footerbar></footerbar></div>', { 'footerbar': MockFooterbarComponent });

        router = new VueRouter();
    });

    it('creates a list item for each Link in links', async () => {
        directiveTest.createComponent();

        await directiveTest.execute((vm) => { // ensure Vue has bootstrapped/run change detection
            expect(vm.$el.querySelectorAll('.footerbar__list li').length).to.equal(links.length);
        });
    });

    it('displays link name', async () => {
        directiveTest.createComponent({ router: router });

        await directiveTest.execute((vm) => { // ensure Vue has bootstrapped/run change detection
            expect(vm.$el.querySelectorAll('.footerbar__list-item')[0].textContent).to.equal(links[0].name);
        });
    });
});