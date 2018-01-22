import Vue from 'vue';
import VueRouter from 'vue-router';
import Component from 'vue-class-component';
import { spy, assert } from 'sinon';
import { expect } from 'chai';
import { ComponentTest, MockLogger } from '../../util/component-test';
import { NavbarComponent } from './navbar';
import { RouterLink } from './../router/';

let loggerSpy = spy();
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
        this.logger = new MockLogger(loggerSpy);
        this.links = links;
    }
}

describe('Navbar component', () => {
    let directiveTest: ComponentTest;
    let router: VueRouter;

    before(() => {
        Vue.use(VueRouter);
        directiveTest = new ComponentTest('<div><navbar></navbar><router-view>loading...</router-view></div>', { 'navbar': MockNavbarComponent });

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
        directiveTest.createComponent({ router: router });

        await directiveTest.execute((vm) => { // ensure Vue has bootstrapped/run change detection
            debugger;
            assert.calledWith(loggerSpy, 'Default object property!');
            expect(vm.$el.querySelectorAll('.navbar__list li').length).to.equal(2);
        });
    });

    it('displays link name', async () => {
        directiveTest.createComponent({ router: router });

        await directiveTest.execute((vm) => { // ensure Vue has bootstrapped/run change detection
            debugger;
            assert.calledWith(loggerSpy, 'Default object property!');
            expect(vm.$el.querySelectorAll('.navbar__list li')[0].textContent).to.equal(links[0].name);
        });
    });

    it('adds active class properly', async () => {
        directiveTest.createComponent({ router: router });

        // assuming route is "/"
        await directiveTest.execute((vm) => {
            expect(vm.$el.querySelectorAll('.navbar__list li.navbar__list-item--active')[0].textContent).to.equal(links[0].name);
        });
    });
});