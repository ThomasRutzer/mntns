import { AxiosPromise } from 'axios';

export interface GithubApiClientInterface {
    getUserRepos(userName: string, maxItemCount?: number): AxiosPromise
    getCommits(repoName: string, userName: string, maxItemCount?: number): AxiosPromise
}
