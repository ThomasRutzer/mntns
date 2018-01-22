import * as types from './mutation-types';

const mutations = {
    [types.EXPAND_BACKGROUND](state) {
        state.backgroundExpanded = true;
    },

    [types.REDUCE_BACKGROUND](state) {
        state.backgroundExpanded = false;
    }
};

export default mutations;