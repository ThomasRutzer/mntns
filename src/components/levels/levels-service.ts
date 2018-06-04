import { injectable, inject } from 'inversify';
import types from './../dependency-injection/types';
import * as mutationTypes from './../../store/mutation-types';
import * as actionTypes from './../../store/action-types';
import { Store } from 'vuex';
import landscapeConfig from './../mnts/mnts-config';
import { gitHubConfig } from './../github-api-client';
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
      // @todo: make this more dynamic
      this.store.commit(mutationTypes.UPDATE_LEVEL, { level: this.allLevels[0] });

      await this.loadData();
  }

  public async start() {
      // @todo: make this more dynamic
      this.store.commit(mutationTypes.UPDATE_LEVEL, { level: this.allLevels[0]});

      await this.loadRepos();
      this.store.commit(mutationTypes.USED_DATA, {
          raw: this.store.state.gitHubData.repos.raw,
          mapped: this.store.state.gitHubData.repos.mapped
      });
  }

  private async loadData() {

      if (this.store.state.levels.currentLevel.index === 1) {
          await this.loadRepos();
          this.store.commit(mutationTypes.USED_DATA, {
              raw: this.store.state.gitHubData.repos.raw,
              mapped: this.store.state.gitHubData.repos.mapped
          });

      } else if (this.store.state.levels.currentLevel.index === 2) {
          const repoName = this.store.state.gitHubData.focusedData.raw.name;
          await this.loadCommits(repoName);

          this.store.commit(mutationTypes.USED_DATA, {
              raw: this.store.state.gitHubData.commits[repoName].raw,
              mapped: this.store.state.gitHubData.commits[repoName].mapped
          });
      }
  }

  private async loadCommits(repoName) {
      await this.store.dispatch(
              actionTypes.RETRIEVE_GITHUB_COMMITS_FOR_REPO,
              { repoName, userName: gitHubConfig.gitHubUsername, perPage: landscapeConfig.maxSceneItems }
          );
      return Promise.resolve();
  }

  private async loadRepos() {
      await this.store.dispatch(
              actionTypes.RETRIEVE_GITHUB_REPOS,
              { userName: gitHubConfig.gitHubUsername, perPage: landscapeConfig.maxSceneItems }
          );
      return Promise.resolve();
  }
}

export default LevelsService;
