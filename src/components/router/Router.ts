import Vue from 'vue';
import VueRouter, { Location, Route, RouteConfig } from 'vue-router';

const homeComponent = () => import('./../home').then(({ HomeComponent }) => HomeComponent);

Vue.use(VueRouter);

export const createRoutes: () => RouteConfig[] = () => [
    {
        path: '/',
        components: {
            content: homeComponent,
            background: null
        },
    },
];

export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() });