import Vuex from 'vuex';
import { expect } from 'chai';

import LegendFactory from './legend-factory';
import * as dataMappers from './../data-mapper/mappers';

describe('LegendFactory', () => {
    let state,
        store;

    before(() => {
        state = {
            levels: {
                currentLevel: {
                    title: 'repositories',
                    dataSrc: 'repos'
                },
            }
        };

        store = new Vuex.Store({
            state
        });
    });

    it('creates a list of LegendItemModels', () => {
        const result = LegendFactory(state);
        let isLegendItemModel = true;
        result.forEach((model) => {
            if (model.constructor.name !== 'LegendItemModel') {
                isLegendItemModel = false;
            }
        });

        expect(isLegendItemModel).to.equals(true)
    });

    it('creates a LegendItemModel for each DataMapper', () => {
        const result = LegendFactory(state);

        expect(result.length).to.equals(dataMappers['reposMappers'].length);
    });

    it('creates LegendItemModel with expected data', () => {
        const result = LegendFactory(state);

        expect(result[0].label).to.equals('height');
        expect(result[0].value).to.equals('repositories→size');
        expect(result[1].label).to.equals('x');
        expect(result[1].value).to.equals('repositories→created_at');
        expect(result[2].label).to.equals('z');
        expect(result[2].value).to.equals('repositories→pushed_at');
    });
});
