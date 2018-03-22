import Vue from 'vue';
import {createRouter} from './components/router/Router';
import store from './store';

// import static / router independent components
import { NavbarComponent  } from './components/navbar';
import { BackgroundComponent } from './components/background';
import { FooterbarComponent } from  './components/footerbar';

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
        'navbar': NavbarComponent,
        'footerbar': FooterbarComponent,
        'background': BackgroundComponent
    },
});
