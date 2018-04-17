import Vue from 'vue';
import Vuex from 'vuex';
import { diContainer, types} from './../components/dependency-injection';

import state from './state';
import getters from './getters';
import actions from './actions';
import * as actionTypes from './action-types';
import mutations from './mutations';
import * as mutationTypes from './mutation-types';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';
const store = new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    strict: debug,
});

diContainer.bind<object>(types.Store).toConstantValue(store);

export {
    mutations,
    mutationTypes,
    actions,
    actionTypes
};