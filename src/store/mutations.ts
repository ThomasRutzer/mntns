import * as types from './mutation-types';

const mutations = {
    [types.EXPAND_BACKGROUND](state) {
        state.backgroundVisibility = 1;
    },

    [types.REDUCE_BACKGROUND](state) {
        state.backgroundVisibility = 0;
    },
};

export default mutations;