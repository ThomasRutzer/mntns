import Vue from 'vue';
import { diContainer, types} from './components/dependency-injection';

import {createRouter} from './components/router/Router';

// import static / router independent components
import { NavbarComponent  } from './components/navbar';
import { ExperimentContainerComponent } from './components/experiment-container';
import { FooterbarComponent } from  './components/footerbar';

// import global directives
import { titleAnimationDirective } from './components/title';
Vue.directive('title-animation', titleAnimationDirective);

import { contentNoPointerEvents } from './components/layout';
Vue.directive('content-no-pointer-events', contentNoPointerEvents);

// import any other modules
import './components/mousemove-follow';
import './components/github-api-client';
import './components/data-mapper';
import './components/media-queries';
import './components/backdrop';

import './main.scss';

let app = new Vue({
    router: createRouter(),
    el: '#app-main',
    store: diContainer.get(types.Store),
    components: {
        'navbar': NavbarComponent,
        'footerbar': FooterbarComponent,
        'experiment-container': ExperimentContainerComponent
    },
});
