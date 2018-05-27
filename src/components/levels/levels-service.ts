import { injectable, inject } from 'inversify';
import types from './../dependency-injection/types';
import * as mutationTypes from './../../store/mutation-types';
import * as actionTypes from './../../store/action-types';
import { Store } from 'vuex';
import config from './levels-config';
import { LevelsServiceInterface } from './levels-service-interface';
import LevelModelInterface from './level-model/level-model-interface';

@injectable()
class LevelsService implements LevelsServiceInterface {
  private store: Store<any>;
  private allLevels: LevelModelInterface[];

  constructor(
      @inject(types.Store) store,
      allLevels: LevelModelInterface[],
  ) {
      this.store = store;
      this.allLevels = allLevels;

      this.store.commit(mutationTypes.UPDATE_LEVEL, { level: this.allLevels[0] });
  }

  public async nextStep() {
      const levelIndex = this.store.state.levels.currentLevel <= this.allLevels.length
          ? this.store.state.levels.currentLevel + 1
          : this.allLevels.length;

      this.store.commit(mutationTypes.UPDATE_LEVEL, { level: this.allLevels[levelIndex] });

      await this.progessState();
  }

  public async previousStep() {
      // @todo: make this more dynamic
      this.store.commit(mutationTypes.UPDATE_LEVEL, { level: this.allLevels[0] });

      await this.progessState();
  }

  public async start() {
      // @todo: make this more dynamci
      this.store.commit(mutationTypes.UPDATE_LEVEL, { level: this.allLevels[0]});

      await this.loadRepos();
      this.store.commit(mutationTypes.USED_DATA, {
          raw: this.store.state.gitHubData.repos.raw,
          mapped: this.store.state.gitHubData.repos.mapped
      });
  }

  private async progessState() {

      if (this.store.state.levels.currentLevel.index === 1) {
          await this.loadRepos();
          this.store.commit(mutationTypes.USED_DATA, {
              raw: this.store.state.gitHubData.repos.raw,
              mapped: this.store.state.gitHubData.repos.mapped
          });

      } else if (this.store.state.levels.currentLevel === 2) {
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
              { repoName, userName: config.gitHubUsername, perPage: config.maxSceneItems }
          );
      return Promise.resolve();
  }

  private async loadRepos() {
      await this.store.dispatch(
              actionTypes.RETRIEVE_GITHUB_REPOS,
              { userName: config.gitHubUsername, perPage: config.maxSceneItems }
          );
      return Promise.resolve();
  }
}

export default LevelsService;
