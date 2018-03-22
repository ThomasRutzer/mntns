import Vue from 'vue';

import { diContainer, types} from './../dependency-injection';
import 'mnts/src/components/generator';

import { MntsComponent} from './mnts';
import { MntnsLevelNavigation } from './mntns-level-navigation';
import { MntsServiceInterface} from './mnts-service-interface';
import MntsService from './mnts-service';
import config from './mnts-config';

Vue.component('mntns-level-navigation', MntnsLevelNavigation);
diContainer.bind<MntsServiceInterface>(types.MntnsService).to(MntsService);

export {
    MntsComponent,
    MntsService,
    MntsServiceInterface,
    config
};