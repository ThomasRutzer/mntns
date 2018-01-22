import { expect } from 'chai'
import { mutations, mutationTypes } from './';

describe('mutations', () => {
    it('reduces background', () => {
        // mock state
        const state = { backgroundExpanded: true };

        // apply mutation
        mutations[mutationTypes.REDUCE_BACKGROUND](state);

        // assert result
        expect(state.backgroundExpanded).to.equal(false)
    });

    it('expands background', () => {
        // mock state
        const state = { backgroundExpanded: false };

        // apply mutation
        mutations[mutationTypes.EXPAND_BACKGROUND](state);

        // assert result
        expect(state.backgroundExpanded).to.equal(true)
    })
});