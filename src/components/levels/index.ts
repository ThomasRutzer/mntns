import Vue from 'vue';
import { interfaces } from 'inversify';
import { diContainer, types} from './../dependency-injection';

import { LevelDataLoaderInterface } from './level-data-loader/level-data-loader-interface';
import LevelModel from './level-model/level-model';
import LevelsService from './levels-service';
import { LevelsServiceInterface } from './levels-service-interface';
import config from './levels-config';

import { LevelProgress } from './level-progress/level-progress';
import LevelDataLoader from './level-data-loader/level-data-loader';
Vue.component('level-progress', LevelProgress);

/**
 * bind allLevels as constant value to DI Container
 */
const allLevels: LevelModel[] = config.allLevels.map((level: LevelModel, index) => {
    return new LevelModel(
        level.index,
        level.title,
        level.dataSrc,
        ((index + 1) / config.allLevels.length) * 100);
});
diContainer.bind<LevelModel[]>(types.AllLevels).toConstantValue(allLevels);

/**
 * binds LevelDataLoader as Singleton to DI Container
 */
diContainer.bind<LevelDataLoaderInterface>(types.LevelsDataLoader)
    .to(LevelDataLoader).inSingletonScope();

/**
 * binds LevelModelFactory to DI Container
 */
diContainer.bind<interfaces.Factory<LevelModel>>(types.LevelModelFactory)
    .toFactory<LevelModel>((context: interfaces.Context) => {
        return (index, title, dataSrc, progress) => {
            return new LevelModel(index, title, dataSrc, progress);
        };
});
diContainer.bind<LevelsServiceInterface>(types.LevelsService)
    .to(LevelsService);

/**
 * binds LevelServiceFactory to DI Container
 */
diContainer.bind<interfaces.Factory<LevelsServiceInterface>>(types.LevelsServiceFactory)
    .toFactory<LevelsService>((context: interfaces.Context) => {
        return () => {
            return context.container.get<LevelsService>(types.LevelsService);
        };
});

export {
  LevelsServiceInterface
};
