import Vue from 'vue';
import VueRouter from 'vue-router';
import Component from 'vue-class-component';
import { expect } from 'chai';
import { ComponentTest } from '../../util/component-test';
import { NavbarComponent } from './navbar';
import RouterLink from './../router/Router-Link';

const links = [
    new RouterLink('Home', '/'),
    new RouterLink('Test', '/test'),
];

@Component({
    template: require('./navbar.html')
})
class MockNavbarComponent extends NavbarComponent {
    constructor() {
        super();
        this.links = links;
    }
}

describe('NavbarComponent', () => {
    let componentTest: ComponentTest;
    let router: VueRouter;

    before(() => {
        Vue.use(VueRouter);
        componentTest = new ComponentTest('<div><navbar></navbar><router-view>loading...</router-view></div>', { 'navbar': MockNavbarComponent });

        let homeComponent = { template: '<div class="home">Home</div>' };
        let testComponent = { template: '<div class="test">Test</div>' };

        router = new VueRouter({
            routes: [
                { path: '/', component: homeComponent },
                { path: '/test', component: testComponent },
            ]
        });
    });

    it('creates a list item for each Link in links', async () => {
        componentTest.createComponent({ router: router });

        await componentTest.execute((vm) => { // ensure Vue has bootstrapped/run change detection
            debugger;
            expect(vm.$el.querySelectorAll('.navbar__list li').length).to.equal(2);
        });
    });

    it('displays link name', async () => {
        componentTest.createComponent({ router: router });

        await componentTest.execute((vm) => { // ensure Vue has bootstrapped/run change detection
            debugger;
            expect(vm.$el.querySelectorAll('.navbar__list li')[0].textContent).to.equal(links[0].name);
        });
    });
});