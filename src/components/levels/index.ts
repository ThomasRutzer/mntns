import Vue from 'vue';
import { interfaces } from 'inversify';

import { diContainer, types} from './../dependency-injection';

import LevelModel from './level-model/level-model';

import { LevelProgress } from './level-progress/level-progress';
Vue.component('level-progress', LevelProgress);

diContainer.bind<interfaces.Factory<LevelModel>>(types.LevelModelFactory).toFactory<LevelModel>((context: interfaces.Context) => {
    return (index, title) => {
        return new LevelModel(index, title);
    };
});
