import { injectable } from "inversify";
import "reflect-metadata";
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { GithubApiClientInterface } from "./github-api-client-interface";

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
            if(response.config.url.includes('commit')) {
                response.data.map((dataSet) => {
                    dataSet.id = dataSet.sha;
                })
            }

            return response;
        });
    }

    getUserRepos(userName: string) {
        return this.httpClient.get(`${baseUrl}/users/${userName}/repos`);
    }

    getCommits(repoName: string, userName: string) {
        return this.httpClient.get(`${baseUrl}/repos/${userName}/${repoName}/commits`);
    }
}

export default GithubApiClient;
export {
    baseUrl
}