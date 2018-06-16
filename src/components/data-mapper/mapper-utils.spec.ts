import * as mapperUtils from './mapper-utils';
import is_same_day from 'date-fns/is_same_day';
import {expect} from 'chai';
import reposMock from './../../../mocks/github-repo-mock';

describe('mapper utils', () => {

    describe('getMinMaxTypeNumber', () => {
        it('returns valid min max from data', () => {
            const mappedData = mapperUtils.getMinMaxTypeNumber(reposMock, "size");
            expect(mappedData[0]).to.equal(549)
            expect(mappedData[1]).to.equal(1407)
        });
    });

    describe('getMinMaxTypeString', () => {
        it('returns valid min max from data', () => {
            const mappedData = mapperUtils.getMinMaxTypeString(reposMock, "name");
            expect(mappedData[0]).to.equal(5)
            expect(mappedData[1]).to.equal(9)
        });
    });

    describe('getMinMaxTypeDate', () => {
        it('returns valid min max from data', () => {
            const mappedData = mapperUtils.getMinMaxTypeDate(reposMock, "created_at");
            expect(is_same_day(mappedData[0], new Date('Fri, 07 Apr 2017 13:08:11'))).to.equal(true);
            expect(is_same_day(mappedData[1], new Date('Sun, 21 Jan 2018 17:28:58'))).to.equal(true);
        });
    });

    describe('rangeMapper', () => {
        it('returns valid values', () => {
            const value = 5;
            const in_range = [0,5];
            const out_range = [0,100];

            expect(mapperUtils.rangeMapper(value, in_range[0], in_range[1], out_range[0], out_range[1])).to.equal(100)
        });
    });
});