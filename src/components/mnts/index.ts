import Vue from 'vue';
import { interfaces } from 'inversify';
import * as Generator from 'mnts/src/components/generator';

import { diContainer, types} from './../dependency-injection';

import { MntsComponent} from './mnts';
import { LevelProgress } from './level-progress/level-progress';
import { MntsServiceInterface} from './mnts-service-interface';
import MntsService from './mnts-service';
import config from './mnts-config';

import { MntnsLegendComponent } from './legend/mntns-legend';

Vue.component('mntns-legend', MntnsLegendComponent);
Vue.component('level-progress', LevelProgress);

diContainer.bind<MntsServiceInterface>(types.MntnsService).to(MntsService);
diContainer.bind<interfaces.Factory<MntsService>>(types.MntnsServiceFactory).toFactory<MntsService>((context: interfaces.Context) => {
    return (mountainId) => {
        const generatorManager = Generator.GeneratorManagerFactory.getById(mountainId);
        const store = diContainer.get(types.Store);

        return new MntsService(store, generatorManager);
    };
});

export {
    MntsComponent,
    MntsService,
    MntsServiceInterface,
    config
};