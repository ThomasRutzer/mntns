import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { types, diContainer } from './../dependency-injection';
import {mutationTypes, actionTypes} from './../../store/';
import {LevelsServiceInterface} from '../levels/levels-service-interface';
import landscapeConfig from './../mnts/mnts-config';
import errors from './errors';

const baseClass = 'change-github-user';

@Component({
    template: require('./change-github-user.html'),
    computed: {
        componentClasses() {
            return [
                this.isFocused ? `${baseClass}--focused` : null,
                this.isInvalid ? `${baseClass}--invalid` : null,
                this.isDisabled ? `${baseClass}--disabled` : null,
                this.nothingFound ? `${baseClass}--nothing-found` : null,
                this.isLoading ? `${baseClass}--loading` : null
            ].join(' ');
        },
        isInvalid() {
            return this.requestedUserName.length <= 0;
        },
    }
})
export class ChangeGithubUserComponent extends Vue {
    public isInvalid: boolean;
    public isFocused: boolean = false;
    public isDisabled: boolean = false;
    public nothingFound: boolean = false;
    public isLoading: boolean = false;
    public requestedUserName: string = '';

    private levelService: LevelsServiceInterface;

    created() {
        this.levelService = diContainer.get<LevelsServiceInterface>(types.LevelsService);
    }

    onSubmit(event?: Event) {
        event ? event.preventDefault() : null;
        return this.progressSubmit();
    }

    async progressSubmit() {
        if (this.isInvalid) {
            return Promise.reject(errors.INVALID);
        }

        this.nothingFound = false;
        this.isDisabled = true;
        this.isLoading = true;

        try {
            await this.$store.dispatch(
                actionTypes.RETRIEVE_GITHUB_REPOS,
                {
                    userName: this.requestedUserName,
                    perPage: landscapeConfig.maxSceneItems
                }
            );

            if (!this.$store.state.gitHubData.loadingError &&
                this.$store.state.gitHubData.repos[this.requestedUserName] &&
                this.$store.state.gitHubData.repos[this.requestedUserName].mapped.length > 0) {
                this.$store.commit(mutationTypes.CHANGE_GITHUB_USERNAME, {userName: this.requestedUserName});
                this.levelService.start();
                this.$router.push('/experiment');
            } else {
                this.nothingFound = true;
                this.requestedUserName = '';
                this.isLoading = false;

                return Promise.reject(errors.NOTHNG_FOUND);
            }

            this.isDisabled = false;
            this.isLoading = false;
            return Promise.resolve();
        } catch (e) {
            this.isLoading = false;
            this.isDisabled = false;
            this.nothingFound = true;
            this.requestedUserName = '';
            return Promise.reject(errors.API_TIMEOUT);
        }
    }

    focus() {
        this.isFocused = true;
    }

    blur() {
        this.isFocused = false;
    }
}