import Vuex from 'vuex';
import axios from 'axios';

import chai, { expect } from 'chai';
import { stub } from 'sinon';
import * as chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

import { diContainer, types } from './../components/dependency-injection';
import MockAdapter from 'axios-mock-adapter';

import { reposMappers } from '../components/data-mapper/mappers';
import repoMock from './../../mocks/github-repo-mock';
import commitsMock from './../../mocks/github-commit-mock';

import { baseUrl } from '../components/github-api-client/github-api-client';
import './../components/github-api-client';
import '../components/data-mapper';
import LegendFactory from './../components/landscape-legend/legend-factory';

import { actions, actionTypes } from './';
import { mutations, mutationTypes } from './';

const mockGithubUserName = 'testUser';
const mockRepoName = 'testRepo';

describe('actions', () => {

    let state, store, diContainerStub;

    before(() => {
        diContainerStub = stub(diContainer, 'get')
            .withArgs(types.DataMinMaxCache).returns({
                cacheProperty: (dataSetId: string, property: string, minMaxValues: {min:any,max:any}) => {},
                clearEntireCache:() => {},
                clearCache: (dataSetId: string) => {},
                getCachedProperty: (dataSetId: string, property: string) => {
                    return { min: 0, max: 50};
                }
            })
            .withArgs(types.DataMapperService).returns({
                map: (dataSet: {cacheId?: string, data: any[]}, mapper: any[]) => {
                    return dataSet.data.map((item) => {
                        return {

                        }
                    });
                }
            })
            .withArgs(types.LegendItemFactory).returns(LegendFactory)
            .withArgs(types.RepositoryMapper).returns(reposMappers)
            .withArgs(types.GithubApiClient).returns({
                getUserRepos: (userName: string, maxItemCount?: number) => Promise.resolve({ data: repoMock }),
                getCommits: (repoName: string, userName: string, maxItemCount?: number) => Promise.resolve({ data: commitsMock })
            }
        );

        state = {
            experimentContainer: {
                visibility: 0,
                activated: false,
                legend: null
            },
            gitHubData: {
                repos: {},
                commits: {}
            },
            levels: {
                currentLevel: null,
            }
        };

        store = new Vuex.Store({
            state,
            actions,
            mutations
        });
    });

    after(() => {
        // @ts-ignore
        diContainer.get.restore();
    });

    describe('type: retrieve github repos', () => {
        let mock;

        beforeEach(() => {
            mock = new MockAdapter(axios);

            mock.onGet(`${baseUrl}/users/${mockGithubUserName}/repos?per_page=10`).reply(
                200,
                repoMock
            );

            store.commit(mutationTypes.UPDATE_LEVEL, {
                level: {
                    index: 1,
                    dataSrc: 'repos',
                    title: 'a level title',
                    progress: 1
                }
            });
        });

        it('returns promise', async () => {
            return expect(actions[actionTypes.RETRIEVE_GITHUB_REPOS]({commit: store.commit, state: state}, { userName: mockGithubUserName, perPage: 10 })).to.eventually.be.fulfilled;
        });

        it('returns promise when called twice', async () => {
            await expect(actions[actionTypes.RETRIEVE_GITHUB_REPOS]({commit: store.commit, state: state}, { userName: mockGithubUserName, perPage: 10 }));
            return expect(actions[actionTypes.RETRIEVE_GITHUB_REPOS]({commit: store.commit, state: state}, { userName: mockGithubUserName, perPage: 10 })).to.eventually.be.fulfilled;
        });

        it('adds repos to store.state', async () => {
           await actions[actionTypes.RETRIEVE_GITHUB_REPOS]({commit: store.commit, state: state}, { userName: mockGithubUserName, perPage: 10 });
           expect(store.state.gitHubData.repos[mockGithubUserName].mapped.length).to.equal(2);
       });

        it('updates legend with expected data', async () => {
            await actions[actionTypes.RETRIEVE_GITHUB_REPOS]({commit: store.commit, state: state}, { userName: mockGithubUserName, perPage: 10 });
            expect(store.state.experimentContainer.legend[0].label).to.equals('height');
            expect(store.state.experimentContainer.legend[0].value).to.equals('a level title→size');
            expect(store.state.experimentContainer.legend[1].label).to.equals('x');
            expect(store.state.experimentContainer.legend[1].value).to.equals('a level title→created_at');
            expect(store.state.experimentContainer.legend[2].label).to.equals('z');
            expect(store.state.experimentContainer.legend[2].value).to.equals('a level title→pushed_at');
            expect(store.state.experimentContainer.legend.length).to.equals(3);
        });
    });

    describe('type: retrieve github commits', () => {
        let mock;

        beforeEach(() => {
            mock = new MockAdapter(axios);

            mock.onGet(`${baseUrl}/repos/${mockGithubUserName}/${mockRepoName}/commits`).reply(
                200,
                commitsMock
            );

            store.commit(mutationTypes.UPDATE_LEVEL, {
                level: {
                    index: 1,
                    dataSrc: 'repos',
                    title: 'another level title',
                    progress: 1
                }
            });
        });

        it('returns promise', async () => {
            return expect(actions[actionTypes.RETRIEVE_GITHUB_COMMITS_FOR_REPO](
                {commit: store.commit, state: state},
                // @ts-ignore Object literal may only specify known properties, and 'repoName' does not exist in type '
                { repoName: mockRepoName, userName: mockGithubUserName, perPage: 0 } ))
                .to.eventually.be.fulfilled;
        });

        it('returns promise when called twice', async () => {
            // @ts-ignore Object literal may only specify known properties, and 'repoName' does not exist in type '
            await expect(actions[actionTypes.RETRIEVE_GITHUB_COMMITS_FOR_REPO]({commit: store.commit, state: state}, { repoName: mockRepoName, userName: mockGithubUserName, perPage: 10 }));
            // @ts-ignore Object literal may only specify known properties, and 'repoName' does not exist in type '
            return expect(actions[actionTypes.RETRIEVE_GITHUB_COMMITS_FOR_REPO]({commit: store.commit, state: state}, { repoName: mockRepoName, userName: mockGithubUserName, perPage: 10 })).to.eventually.be.fulfilled;
        });

        it('adds commit to store', async () => {
            // @ts-ignore Object literal may only specify known properties, and 'repoName' does not exist in type '
            await actions[actionTypes.RETRIEVE_GITHUB_COMMITS_FOR_REPO]({commit: store.commit, state: state}, { repoName: mockRepoName, userName: mockGithubUserName, perPage: 10 } );
            expect(store.state.gitHubData.commits[mockRepoName].mapped).to.exist;
            expect(store.state.gitHubData.commits[mockRepoName].raw).to.exist;
        });

        it('updates legend with expected data', async () => {
            await actions[actionTypes.RETRIEVE_GITHUB_REPOS]({commit: store.commit, state: state}, { userName: mockGithubUserName, perPage: 10 });
            expect(store.state.experimentContainer.legend[0].label).to.equals('height');
            expect(store.state.experimentContainer.legend[0].value).to.equals('another level title→size');
            expect(store.state.experimentContainer.legend[1].label).to.equals('x');
            expect(store.state.experimentContainer.legend[1].value).to.equals('another level title→created_at');
            expect(store.state.experimentContainer.legend[2].label).to.equals('z');
            expect(store.state.experimentContainer.legend[2].value).to.equals('another level title→pushed_at');
            expect(store.state.experimentContainer.legend.length).to.equals(3);
        });

    });
});
