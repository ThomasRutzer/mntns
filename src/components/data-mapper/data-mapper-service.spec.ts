import DataMapperService from './data-mapper-service';
import { DataMapperServiceInterface } from "./";
import { expect } from 'chai';

import data from './../../../mocks/github-repo-mock';

describe('Data Mapper', () => {
    let mapper: DataMapperServiceInterface = null;
    const mappers = [
        {
            dataKey: ["size"],
            mountainsParameter: "height",
            min: 0,
            max: 50,
            type: "number",
        },
    ];

    beforeEach(() => {
       mapper = new DataMapperService();
    });

    it('maps every entry of data array', () => {
        const mappedData = mapper.map(data, mappers);
        expect(mappedData.length).to.equal(data.length)
    });

    it('maps properly', () => {
        const mappedData: Array<any> = mapper.map(data, mappers);
        expect(mappedData[0].height).to.equal(50);
        expect(mappedData[1].height).to.equal(0);
    })
});