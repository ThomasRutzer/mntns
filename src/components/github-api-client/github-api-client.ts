import { injectable } from 'inversify';
import 'reflect-metadata';
import axios, {AxiosInstance, AxiosPromise, AxiosResponse} from 'axios';
import { GithubApiClientInterface } from './github-api-client-interface';

const baseUrl = 'https://api.github.com';

@injectable()
class GithubApiClient implements GithubApiClientInterface {
    private httpClient: AxiosInstance;

    constructor() {
        this.httpClient = axios.create();

        /**
         * commits on github don´t have a @property id
         */
        this.httpClient.interceptors.response.use(function(response: AxiosResponse) {
            if (response.config.url.includes('commit')) {
                response.data.map((dataSet) => {
                    dataSet.id = dataSet.sha;
                });
            }

            return response;
        });
    }

    /**
     *
     * @param {string} userName
     * @param {number} maxItemCount, where 0 equals all
     * @return {AxiosPromise}
     */
    getUserRepos(userName: string, maxItemCount: number = 0): AxiosPromise {
        return this.httpClient.get(`${baseUrl}/users/${userName}/repos?per_page=${maxItemCount}`);
    }

    /**
     *
     * @param {string} repoName
     * @param {string} userName
     * @param {number} maxItemCount, where 0 equals all
     * @return {AxiosPromise}
     */
    getCommits(repoName: string, userName: string, maxItemCount: number = 0) {
        return this.httpClient.get(`${baseUrl}/repos/${userName}/${repoName}/commits?per_page=${maxItemCount}`);
    }
}

export default GithubApiClient;
export {
    baseUrl
};