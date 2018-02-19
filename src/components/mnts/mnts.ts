import { Component, Vue } from 'vue-property-decorator';
import { GithubApiClientInterface } from "../github-api-client";
import { types, diContainer } from "../dependency-injection";
import { MntsDataMapperInterface } from "./mnts-data-mapper-interface";

@Component({
    template: require('./mnts.html'),
})
export class MntsComponent extends Vue {
    private githubApiClient;
    private dataMapper;

    async created() {
        console.log(diContainer)
        this.githubApiClient = diContainer.get<GithubApiClientInterface>(types.GithubApiClient);
        this.dataMapper = diContainer.get<MntsDataMapperInterface>(types.MntsDataMapper);

        console.log(this.dataMapper);
        const res = await this.githubApiClient.getUserRepos('thomasrutzer');
        const data = this.dataMapper.mapRepos(res.data);
    }
}