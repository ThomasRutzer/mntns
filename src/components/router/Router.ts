import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import { HomeComponent }  from './../home';
import { InfoComponent } from './../info';
import { ExperimentStartComponent } from './../experiment-start';
import { MntsComponent } from './../mnts';
import { ExperimentUpdateComponent } from '../experiment-upate/experiment-update';

Vue.use(VueRouter);

export const createRoutes: () => RouteConfig[] = () => [
    {
        path: '/',
        components: {
            content: HomeComponent,
            'experiment-container': MntsComponent
        },
    },

    {
        path: '/experiment',
        components: {
            content: ExperimentStartComponent,
            'experiment-container': MntsComponent,
        },
    },

    {
        path: '/update',
        components: {
            content: ExperimentUpdateComponent,
            'experiment-container': MntsComponent,
        },
    },

    {
        path: '/info',
        components: {
            content: InfoComponent,
            'experiment-container': null
        },
    },
];

export const createRouter = () => new VueRouter({
    mode: 'history',
    routes: createRoutes(),
    // base: '/',
    scrollBehavior () {
        return { x: 0, y: 0 };
    }
});
