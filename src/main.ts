import Vue from 'vue';
import {createRouter} from './components/router/Router';
import store from './store'

// import static / router independent components
const navbarComponent = () => import('./components/navbar').then(({ NavbarComponent }) => NavbarComponent);
const footerbarComponent = () => import('./components/footerbar').then(({ FooterbarComponent }) => FooterbarComponent);

import './main.scss';



let app = new Vue({
    router: createRouter(),
    el: '#app-main',
    store,
    components: {
        'navbar': navbarComponent,
        'footerbar': footerbarComponent
    }
});
