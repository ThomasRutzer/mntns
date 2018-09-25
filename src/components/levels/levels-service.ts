import { injectable, inject } from 'inversify';
import types from './../dependency-injection/types';
import * as mutationTypes from './../../store/mutation-types';
import { Store } from 'vuex';
import { LevelsServiceInterface } from './levels-service-interface';
import LevelModelInterface from './level-model/level-model-interface';
import {LevelDataLoaderInterface} from './level-data-loader/level-data-loader-interface';

@injectable()
class LevelsService implements LevelsServiceInterface {
  private store: Store<any>;
  private allLevels: LevelModelInterface[];
  private levelDataLoader: LevelDataLoaderInterface;

  constructor(
      @inject(types.Store) store,
      @inject (types.AllLevels) allLevels,
      @inject(types.LevelsDataLoader) levelDataLoader
  ) {
      this.store = store;
      this.allLevels = allLevels;
      this.levelDataLoader = levelDataLoader;

      // commit first level on start
      this.store.commit(mutationTypes.UPDATE_LEVEL, { level: this.allLevels[0] });
  }

  public async nextStep() {
      const levelIndex = this.store.state.levels.currentLevel.index < this.allLevels.length
          ? this.store.state.levels.currentLevel.index + 1
          : this.allLevels.length;

      this.store.commit(mutationTypes.UPDATE_LEVEL, { level: this.allLevels[levelIndex - 1] });
      await this.loadData();
  }

  public async previousStep() {
      const levelIndex = this.store.state.levels.currentLevel.index > 0
          ? this.store.state.levels.currentLevel.index - 1
          : 1;

      this.store.commit(mutationTypes.UPDATE_LEVEL, { level: this.allLevels[levelIndex - 1] });
      await this.loadData();
  }

  public async start() {
      this.store.commit(mutationTypes.UPDATE_LEVEL, { level: this.allLevels[0]});
      await this.loadData();
  }

  private async loadData() {
      await this.levelDataLoader
          .loadByType(this.store.state.levels.currentLevel.dataSrc);
  }
}

export default LevelsService;
