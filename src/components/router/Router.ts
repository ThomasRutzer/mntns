import Vue from 'vue';
import VueRouter from 'vue-router';

import { HomeComponent }  from './../home';
import { InfoComponent } from './../info';
import { ExperimentStartComponent } from './../experiment-start';
import { MntsComponent } from './../mnts';
import { ExperimentUpdateComponent } from '../experiment-upate/experiment-update';

// @ts-ignore
Vue.use(VueRouter);

export const createRouter = () => new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            components: {
                content: HomeComponent,
                'experiment-container': MntsComponent
            }
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
    ],
    base: '/mntns/dist/',
    scrollBehavior () {
        return { x: 0, y: 0 };
    }
});
