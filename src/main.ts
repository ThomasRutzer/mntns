import Vue from 'vue';
import {createRouter} from './components/router/Router';

import './main.scss';

let app = new Vue({
    router: createRouter(),
    el: '#app-main',
});
