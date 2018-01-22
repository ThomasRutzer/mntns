import Vue from 'vue';
import {createRouter} from './components/router/Router';

const navbarComponent = () => import('./components/navbar').then(({ NavbarComponent }) => NavbarComponent);
const footerComponent = () => import('./components/footer').then(({ FooterComponent }) => FooterComponent);

import './main.scss';

let app = new Vue({
    router: createRouter(),
    el: '#app-main',
    components: {
        'navbar': navbarComponent,
        'footerbar': footerComponent
    }
});
