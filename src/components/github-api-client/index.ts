import GithubApiClient from './github-api-client';
import { GithubApiClientInterface } from './github-api-client-interface';
import { diContainer, types} from './../dependency-injection';

diContainer.bind<GithubApiClientInterface>(types.GithubApiClient).to(GithubApiClient);

export {
    GithubApiClientInterface,
    GithubApiClient
}