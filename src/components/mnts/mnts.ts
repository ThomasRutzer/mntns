import { Component, Vue } from 'vue-property-decorator';
import { GithubApiClientInterface } from "../github-api-client";
import { types, diContainer } from "../dependency-injection";
import { MntsDataMapperInterface } from "./mnts-data-mapper-interface";

import { GeneratorComponent } from './../../../node_modules/mnts/src/components/generator';
import { SceneComponent } from './../../../node_modules/mnts/src/components/scene';

Vue.component('generator', GeneratorComponent);
Vue.component('scene', SceneComponent);

@Component({
    template: require('./mnts.html'),
})
export class MntsComponent extends Vue {
    private githubApiClient;
    private dataMapper;

    data: any[] = [];

    async created() {
        this.githubApiClient = diContainer.get<GithubApiClientInterface>(types.GithubApiClient);
        this.dataMapper = diContainer.get<MntsDataMapperInterface>(types.MntsDataMapper);

        const res = await this.githubApiClient.getUserRepos('thomasrutzer');
        this.data = this.dataMapper.mapRepos(res.data);
    }

    expandMnts() {
        this.$router.push('mnts');
    }
}