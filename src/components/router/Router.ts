import Vue from 'vue';
import VueRouter, { Location, Route, RouteConfig } from 'vue-router';

const homeComponent = () => import('./../home').then(({ HomeComponent }) => HomeComponent);
const contactComponent = () => import('./../contact').then(({ ContactComponent }) => ContactComponent);
const experimentsListingComponent = () => import('./../experiments-listing').then(({ ExperimentsListingComponent }) => ExperimentsListingComponent);
const mntsComponent = () => import('./../mnts').then(({ MntsComponent }) => MntsComponent);

Vue.use(VueRouter);

export const createRoutes: () => RouteConfig[] = () => [
    {
        path: '/',
        components: {
            content: homeComponent,
            background: mntsComponent
        },
    },

    {
        path: '/mnts',
        components: {
            content: experimentsListingComponent,
            background: mntsComponent
        },
    },

    {
        path: '/contact',
        components: {
            content: contactComponent,
            background: null
        },
    },
];

export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() });