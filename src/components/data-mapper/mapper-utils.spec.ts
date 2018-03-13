import * as mapperUtils from './mapper-utilts';
import {expect} from 'chai';

describe('mapper utils', () => {
    const data = [
        {
            "id": 87546623,
            "name": "mntns",
            "description": null,
            "created_at": "2017-04-07T13:08:11Z",
            "updated_at": "2017-11-16T22:00:14Z",
            "pushed_at": "2018-02-26T11:29:24Z",
            "size": 1407,
        },
        {
            "id": 118357197,
            "name": "portfolio",
            "created_at": "2018-01-21T17:28:58Z",
            "updated_at": "2018-02-14T10:42:58Z",
            "pushed_at": "2018-02-26T11:34:12Z",
            "homepage": null,
            "size": 549,
            "license": null,
            "forks": 0,
            "open_issues": 0,
            "default_branch": "master"
        }
    ];

    describe('getMinMaxTypeNumber', () => {
        it('returns valid min max from data', () => {
            const mappedData = mapperUtils.getMinMaxTypeNumber(data, "size");
            expect(mappedData[0]).to.equal(549)
            expect(mappedData[1]).to.equal(1407)
        });

        it('caches properly', () => {
            const mappedData = mapperUtils.getMinMaxTypeNumber(data, "size");
            expect(mapperUtils.minMaxCache["size"]).to.equal(mappedData);
        });
    });

    describe('getMinMaxTypeString', () => {
        it('returns valid min max from data', () => {
            const mappedData = mapperUtils.getMinMaxTypeString(data, "name");
            expect(mappedData[0]).to.equal(5)
            expect(mappedData[1]).to.equal(9)
        });
    });

    describe('getMinMaxValueTypeDate', () => {
        it('returns valid min max from data', () => {
            const mappedData = mapperUtils.getMinMaxValueTypeDate(data, "created_at", "2018-01-18T17:28:58Z");
            expect(mappedData[0]).to.equal(0)
            expect(mappedData[1]).to.equal(289)
        });

        it('caches properly', () => {
            const mappedData = mapperUtils.getMinMaxValueTypeDate(data, "pushed_at", "2018-01-21T17:28:58Z");
            expect(mapperUtils.minMaxCache["pushed_at"]).to.exist;
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