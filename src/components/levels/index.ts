import Vue from 'vue';
import { interfaces } from 'inversify';

import { diContainer, types} from './../dependency-injection';

import LevelModel from './level-model/level-model';
import LevelsService from './levels-service';
import { LevelsServiceInterface } from './levels-service-interface';
import config from './levels-config';

import { LevelProgress } from './level-progress/level-progress';
Vue.component('level-progress', LevelProgress);


diContainer.bind<interfaces.Factory<LevelModel>>(types.LevelModelFactory).toFactory<LevelModel>((context: interfaces.Context) => {
    return (index, title, progress) => {
        return new LevelModel(index, title, progress);
    };
});

diContainer.bind<interfaces.Factory<LevelsServiceInterface>>(types.LevelsServiceFactory).toFactory<LevelsService>((context: interfaces.Context) => {
    return () => {
        const allLevels: LevelModel[] = config.allLevels.map((level, index) => {
            return new LevelModel(level.index, level.title, ((index + 1) / config.allLevels.length) * 100);
        });
        const store = diContainer.get(types.Store);

        return new LevelsService(store, allLevels);
    };
});

export {
  LevelModel,
  LevelsServiceInterface
};
