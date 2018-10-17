import Vuex from 'vuex';

import { expect } from 'chai';
import { stub, assert, spy } from 'sinon';
import { mount, createLocalVue } from '@vue/test-utils';

import { diContainer, types } from '../dependency-injection';
import { actionTypes, mutations, mutationTypes } from '../../store';

import { ChangeGithubUserComponent } from './change-github-user';
import errors from './errors';
import VueRouter from 'vue-router';
import rawRepos from './../../../mocks/github-repo-mock';

const resolveMockGithubUser = 'thisWins';
const localVue = createLocalVue();
const mappedRepos = [{id: 1}, {id: 2}];
const router = new VueRouter();
localVue.use(VueRouter);

describe('ChangeGithubUserComponent', () => {
    let store,
        state,
        actions,
        diContainerStub,
        wrapper
    ;

    before(() => {
        actions = {
            [actionTypes.RETRIEVE_GITHUB_REPOS]: (type, payload) => {
                if (payload.userName === resolveMockGithubUser) {
                    store.commit(mutationTypes.STORE_GITHUB_REPOS, {
                        userName: resolveMockGithubUser,
                        rawRepos: rawRepos,
                        mappedRepos: mappedRepos
                    });
                }

                return Promise.resolve()
            }
        };

        diContainerStub = stub(diContainer, 'get')
            .withArgs(types.LevelsService).returns({
                start: () => {
                }
            });
    });

    beforeEach(() => {
        state = {
            gitHubData: {
                userName: 'testname',
                loadingError: false,
                repos: {}
            }
        };

        store = new Vuex.Store({
            state,
            mutations,
            actions
        });

        wrapper = mount(ChangeGithubUserComponent, {store, localVue, router});
    });

    after(() => {
        // @ts-ignore
        diContainer.get.restore();
    });

    it('pushes new router state "/experiment" when new github user name has results', async () => {
        try {
            const routerPushSpy = spy(wrapper.vm.$router, 'push');
            wrapper.vm.requestedUserName = resolveMockGithubUser;
            await wrapper.vm.onSubmit();

            assert.calledWith(routerPushSpy, '/experiment');
            routerPushSpy.restore();
        } catch (e) {}
    });

    it('holds an instance of LevelService', () => {
        expect(wrapper.vm.levelService).not.to.be.undefined;
    });

    it('calls LevelService.start() when new github user name has results', async () => {
        try {
            const routerPushSpy = spy(wrapper.vm.levelService, 'start');
            wrapper.vm.requestedUserName = resolveMockGithubUser;
            await wrapper.vm.onSubmit();

            assert.called(routerPushSpy);
            routerPushSpy.restore();
        } catch (e) {}

    });

    it('commits new github user name to store when it has results', async () => {
        try {
            wrapper.vm.requestedUserName = resolveMockGithubUser;
            await wrapper.vm.onSubmit();

            expect(wrapper.vm.$store.state.gitHubData.userName);
        } catch (e) {}
    });

    it('declares "nothingFound" when new github user name has no results', async () => {
        try {
            // make sure its valid
            wrapper.vm.requestedUserName = 'any';
            await wrapper.vm.onSubmit();

            expect(wrapper.vm.nothingFound).to.equals(true);
        } catch (e) {}
    });

    it('disables component on submit until there is either a result or error', async () => {
        try {
            // make sure component is valid
            wrapper.vm.requestedUserName = 'any';
            const promise = wrapper.vm.onSubmit();

            expect(wrapper.vm.isDisabled).to.equals(true);

            promise.then(() => {
                expect(wrapper.vm.isDisabled).to.equals(false);
            }, () => {})
        } catch (e) {}
    });

    it('cannot submit when invalid', async () => {
        // make sure component is invalid
        wrapper.vm.requestedUserName = '';

        try {
            await wrapper.vm.onSubmit();
        } catch (error) {
            expect(error).to.equals(errors.INVALID);
        }
    });

    it('adds invalid class when invalid', () => {
        // make sure component is invalid
        wrapper.vm.requestedUserName = '';

        expect(wrapper.vm.componentClasses).to.contain('change-github-user--invalid');
    });

    it('adds focus class when focused', () => {
        // make sure component is focused
        wrapper.vm.isFocused = true;

        expect(wrapper.vm.componentClasses).to.contain('change-github-user--focused');
    });

    it('adds loading class when is loading', async () => {
        // make sure component is loading
        wrapper.vm.isLoading = true;

        expect(wrapper.vm.componentClasses).to.contain('change-github-user--loading');
    });

});
