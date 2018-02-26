import { expect } from 'chai';
import rangeMapper from './range-mapper';

describe('rangeMapper', () => {
    it('returns valid values', () => {
        const value = 5;
        const in_range = [0,5];
        const out_range = [0,100];

        expect(rangeMapper(value, in_range[0], in_range[1], out_range[0], out_range[1])).to.equal(100)
    });
});