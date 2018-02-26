import { injectable } from "inversify";
import "reflect-metadata";
import axios from 'axios';
import { GithubApiClientInterface } from "./github-api-client-interface";

const baseUrl = 'https://api.github.com';

@injectable()
class GithubApiClient implements GithubApiClientInterface {

    getUserRepos(userName: string) {
        return axios.get(`${baseUrl}/users/${userName}/repos`);
    }
}

export default GithubApiClient;
export {
    baseUrl
}