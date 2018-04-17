import { expect } from 'chai';
import Vuex from 'vuex';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import repoMock from './../../mocks/github-repo-mock';
import commitsMock from './../../mocks/github-commit-mock';

import {baseUrl} from '../components/github-api-client/github-api-client';
import './../components/github-api-client';
import '../components/data-mapper';

import { actions, actionTypes } from './';
import { mutations, mutationTypes } from './';

const mockGithubUserName = 'testUser';
const mockRepoName = 'testRepo';

describe('actions', () => {

    let state, store;

    before(() => {
        state = {
            gitHubData: {
                repos: {
                    mapped: null,
                    raw: null,
                },
                commits: {}
            }
        };

        store = new Vuex.Store({
            state,
            actions,
            mutations
        });
    });

    describe('type: retrieve github repos', () => {
        let mock;

        beforeEach(() => {
            mock = new MockAdapter(axios);

            mock.onGet(`${baseUrl}/users/${mockGithubUserName}/repos?per_page=10`).reply(
                200,
                repoMock
            );
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
           expect(store.state.gitHubData.repos.mapped.length).to.equal(2);
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
    });
});
