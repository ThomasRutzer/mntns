import Vue from 'vue';
import {createRouter} from './components/router/Router';
import store from './store'

// import static / router independent components
const navbarComponent = () => import('./components/navbar').then(({ NavbarComponent }) => NavbarComponent);
const backgroundComponent = () => import('./components/background').then(({ BackgroundComponent }) => BackgroundComponent);
const footerbarComponent = () => import('./components/footerbar').then(({ FooterbarComponent }) => FooterbarComponent);

// import global directives
import { titleAnimationDirective } from './components/string-operations';
Vue.directive('title-animation', titleAnimationDirective);

// import any other modules
import './components/github-api-client';
import './components/data-mapper';

import './main.scss';

let app = new Vue({
    router: createRouter(),
    el: '#app-main',
    store,
    components: {
        'navbar': navbarComponent,
        'footerbar': footerbarComponent,
        'background': backgroundComponent
    },
});
