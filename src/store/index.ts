import Vue from 'vue'
import Vuex from 'vuex'
import state from './state';
import getters from './getters';
import actions from './actions'
import mutations from './mutations';
import * as mutationTypes from './mutation-types';
import * as actionTypes from './action-types';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    strict: debug,
})

export {
    mutations,
    mutationTypes,
    actions,
    actionTypes
}