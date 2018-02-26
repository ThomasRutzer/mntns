import { expect } from 'chai'
import { mutations, mutationTypes } from './';

describe('mutations', () => {
    it('reduces background', () => {
        // mock state
        const state = { backgroundVisibility: 1 };

        // apply mutation
        mutations[mutationTypes.REDUCE_BACKGROUND](state, null);

        // assert result
        expect(state.backgroundVisibility).to.equal(0)
    });

    it('expands background', () => {
        // mock state
        const state = { backgroundVisibility: 0 };

        // apply mutation
        mutations[mutationTypes.EXPAND_BACKGROUND](state, null);

        // assert result
        expect(state.backgroundVisibility).to.equal(1)
    })
});