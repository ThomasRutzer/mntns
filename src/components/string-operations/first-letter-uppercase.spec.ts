import {expect} from 'chai';
import firstLetterUppercase from './first-letter-uppercase';

describe('first letter uppercase util', () => {
    it('makes first letter uppercase for given string', () => {
        let stringToTest = 'anyname';
        expect(firstLetterUppercase(stringToTest)).to.equal('Anyname');
    });

    it('skips if first letter is already uppercase', () => {
        let stringToTest = 'Anyname';
        expect(firstLetterUppercase(stringToTest)).to.equal('Anyname');
    });
});