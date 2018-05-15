import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import { HomeComponent }  from './../home';
import { ContactComponent } from './../contact';
import { ExperimentStartComponent } from './../experiment-start';
import { MntsComponent } from './../mnts';

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
        path: '/contact',
        components: {
            content: ContactComponent,
            'experiment-container': null
        },
    },
];

export const createRouter = () => new VueRouter({
    mode: 'history',
    routes: createRoutes(),
    base: '/mntns/dist/',
    scrollBehavior () {
        return { x: 0, y: 0 };
    }
});
