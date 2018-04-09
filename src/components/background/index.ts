import Vue from 'vue';
import { BackgroundComponent } from './background';
import { BackgroundBackdropComponent } from './backdrop/background-backdrop';

Vue.component('background-backdrop', BackgroundBackdropComponent);

export {
    BackgroundComponent,
    BackgroundBackdropComponent
};