import Vue from 'vue';

import { diContainer, types} from './../dependency-injection';
import 'mnts/src/components/generator';

import { MntsComponent} from './mnts';
import { LevelProgress } from './level-progress/level-progress';
import { MntsServiceInterface} from './mnts-service-interface';
import MntsService from './mnts-service';
import config from './mnts-config';

Vue.component('level-progress', LevelProgress);
diContainer.bind<MntsServiceInterface>(types.MntnsService).to(MntsService);

export {
    MntsComponent,
    MntsService,
    MntsServiceInterface,
    config
};