import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { types, diContainer } from './../dependency-injection';
import {mutationTypes} from './../../store/';
import {LevelDataLoaderInterface} from "../levels/level-data-loader/level-data-loader-interface";
import {LevelsServiceInterface} from "../levels/levels-service-interface";
import {Mutation, MutationPayload} from "vuex";

const baseClass = 'change-github-user';

@Component({
    template: require('./change-github-user.html'),
    computed: {
        componentClasses() {
            return [
                this.isFocused ? `${baseClass}--focused` : null
            ].join(' ');
        },
        validInput() {
            return this.requestedUserName.length > 0;
        },

        loadingError() {
            return this.$store.state.gitHubData.loadingError;
        }
    }
})
export class ChangeGithubUserComponent extends Vue {
    public isFocused = false;
    public isDisabled = false;
    public requestedUserName = this.$store.state.gitHubData.userName;

    private levelService: LevelsServiceInterface;
    private lastUserName = this.requestedUserName;

    created() {
        this.levelService = diContainer.get<LevelsServiceInterface>(types.LevelsService);
    }

    onSubmit(event: Event) {
        this.isDisabled = true;
        this.$store.commit(mutationTypes.CHANGE_GITHUB_USERNAME, {userName: this.requestedUserName});
        this.levelService.start();

        /**
         * check if state is mutated by new USED_DATA
         * and push new route if thats true
         */
        this.$store.subscribe((mutation: MutationPayload) => {
            if (mutation.type === mutationTypes.GITHUB_API_FINISHED) {
                this.isDisabled = false;
                this.lastUserName = this.requestedUserName;
                this.$router.push('/experiment');
            } else if (mutation.type === mutationTypes.GITHUB_API_LOADING_ERROR) {
                this.isDisabled = false;
                this.$store.commit(mutationTypes.CHANGE_GITHUB_USERNAME, {userName: this.lastUserName});
                this.requestedUserName = this.lastUserName;
            }
        })
        
    }
}