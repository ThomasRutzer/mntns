import Vue from 'vue';
import VueRouter, { Location, Route, RouteConfig } from 'vue-router';

const homeComponent = () => import('./../home').then(({ HomeComponent }) => HomeComponent);

Vue.use(VueRouter);

export const createRoutes: () => RouteConfig[] = () => [
    {
        path: '/',
        component: homeComponent,
    },
];

export const createRouter = () => new VueRouter({ mode: 'history', routes: createRoutes() });