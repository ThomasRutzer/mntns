import MockAdapter from 'axios-mock-adapter';
import chai, { expect } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import githubReposMock from './../../../mocks/github-repo-mock';
import githubCommitsMock from './../../../mocks/github-commit-mock';
import GithubApiClient, { baseUrl } from './github-api-client';
import {GithubApiClientInterface} from "./github-api-client-interface";

chai.use(chaiAsPromised);

const mockGithubUserName = 'testname';
const mockRepoName = 'testRepo';

describe('Github Api client', () => {

    let mock,
        client: GithubApiClientInterface;

    beforeEach(() => {
        client = new GithubApiClient();

        // mock private httpClient
        mock = new MockAdapter((client as any).httpClient);

        mock.onGet(`${baseUrl}/users/${mockGithubUserName}/repos?per_page=0`).reply(
            200,
            githubReposMock
        );

        mock.onGet(`${baseUrl}/repos/${mockGithubUserName}/${mockRepoName}/commits?per_page=0`).reply(
            200,
            githubCommitsMock
        );
    });

    describe('method getUserRepos()', () => {
       it('fullfils with expected data', async () => {
           const result = await client.getUserRepos(mockGithubUserName);
           expect(result.data).to.equal(githubReposMock);

       });

        it('rejects when called with invalid user', () => {
            const result = client.getUserRepos('invalid');
            return expect(result).to.be.rejected;
        });

        it('returns promise', () => {
            const result = client.getUserRepos(mockGithubUserName);
            return expect(result).to.eventually.be.fulfilled;
        });
   });

    describe('method getCommits()', () => {
        it('fullfils with expected data', async () => {
            const result = await client.getCommits(mockRepoName, mockGithubUserName);
            expect(result.data).to.equal(githubCommitsMock);
        });

        it('rejects when called with invalid user', () => {
            const result = client.getCommits(mockRepoName, 'invalid');
            return expect(result).to.be.rejected;
        });

        it('rejects when called with invalid repo', () => {
            const result = client.getCommits('invalid', mockGithubUserName);
            return expect(result).to.be.rejected;
        });

        it('returns promise', () => {
            const result = client.getCommits(mockRepoName, mockGithubUserName);
            return expect(result).to.eventually.be.fulfilled;
        });

        it('maps property sha to id for each response data item', async () => {
            const result = await client.getCommits(mockRepoName, mockGithubUserName);
            return expect(result.data[0].id).to.equal(githubCommitsMock[0].sha);
        });
    })
});