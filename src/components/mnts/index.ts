import Vue from 'vue';

import config from './mnts-config';

import { MntsComponent} from './mnts';
import { MntnsLegendComponent } from './legend/mntns-legend';

Vue.component('mntns-legend', MntnsLegendComponent);

export {
    MntsComponent,
    config
};
