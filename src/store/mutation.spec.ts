import { expect } from 'chai';
import { mutations, mutationTypes } from './';

describe('mutations', () => {
    it('reduces experimentContainer', () => {
        // mock state
        const state = {
            experimentContainer: {
                visibility: 1
            }
        };

        // apply mutation
        mutations[mutationTypes.REDUCE_EXPERIMENT_CONTAINER](state, null);

        // assert result
        expect(state.experimentContainer.visibility).to.equal(0);
    });

    it('expands experimentContainer', () => {
        // mock state
        const state = {
            experimentContainer: {
                visibility: 1
            }
        };

        // apply mutation
        mutations[mutationTypes.EXPAND_EXPERIMENT_CONTAINER](state, null);

        // assert result
        expect(state.experimentContainer.visibility).to.equal(1);
    });
});