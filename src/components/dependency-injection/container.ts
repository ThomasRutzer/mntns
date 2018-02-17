import { Container } from "inversify";
import types from './types';
import { GithubApiClientInterface, GithubApiClient} from "../github-api-client/";

const diContainer = new Container();

diContainer.bind<GithubApiClientInterface>(types.GithubApiClient).to(GithubApiClient);

export default diContainer;
