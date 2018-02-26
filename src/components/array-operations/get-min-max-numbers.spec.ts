import { expect } from 'chai';
import getMinMaxNumbers from './get-min-max-numbers';

describe('getMinMaxNumbers', () => {
   it('returns valid values', () => {
        const [min, max] = getMinMaxNumbers(1,9,21,4,3,5,1);

        expect(min).to.equal(1);
        expect(max).to.equal(21);
   });
});