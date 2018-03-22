import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import { HomeComponent }  from './../home';
import { ContactComponent } from './../contact';
import { ExperimentsListingComponent } from './../experiments-listing';
import { MntsComponent } from './../mnts';

Vue.use(VueRouter);

export const createRoutes: () => RouteConfig[] = () => [
    {
        path: '/',
        components: {
            content: HomeComponent,
            background: MntsComponent
        },
    },

    {
        path: '/experiments',
        components: {
            content: ExperimentsListingComponent,
            background: MntsComponent,
        },
    },

    {
        path: '/contact',
        components: {
            content: ContactComponent,
            background: null
        },
    },
];

export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() });