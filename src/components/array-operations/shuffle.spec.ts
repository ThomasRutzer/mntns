import { expect } from 'chai';

import shuffle from './shuffle';

describe('shuffle', () => {
   it('shuffles randomly', () => {
      let array = [0,1,2,3,4,5,6,7,8,9];
      let shuffledArray = array.slice(0);

      shuffledArray = shuffle(shuffledArray);

      expect(array).not.to.equal(shuffledArray);
   });
});