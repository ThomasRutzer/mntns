/**
 * class FocusDataService handles
 * intersected data from 3D-Landscape
 * and commits filtered matching data set
 * to Store
 */
import {Store} from 'vuex';
import * as mutationTypes from '../../store/mutation-types';
import {injectable, inject} from 'inversify';
import types from '../dependency-injection/types';

import {firstLetterUppercase} from './../string-operations';
import {findDeep} from './../object-utils/';

import {FocusDataServiceInterface} from './focus-data-service-interface';
import {ExtractedFocusDataInterface} from './extracted-focus-data-interface';
import * as extractMappers from './extract-mappers';

@injectable()
class FocusDataService implements FocusDataServiceInterface {
    private store: Store<any>;

    constructor(@inject(types.Store) store) {
        this.store = store;
    }

    public commitFocusedData(id: string) {
        let extracted, raw, mapped;

        raw = this.store.state.gitHubData.usedData.raw.filter((data) => {
            return data.id.toString() === id;
        });

        mapped = this.store.state.gitHubData.usedData.mapped.filter((data) => {
            return data.id === id;
        });

        extracted = this.extractData(
            raw[0],
            extractMappers[`extractFrom${firstLetterUppercase(this.store.state.gitHubData.usedData.dataSrc)}`]
        );

        if (raw.length > 0) {
            this.store.commit(mutationTypes.FOCUS_REPO, {
                raw: raw[0],
                mapped: mapped[0],
                extracted,
                id: id
            });
        } else {
            this.store.commit(mutationTypes.UNFOCUS_REPO);
        }
    }

    private extractData(data, mapper) {
        const result = {};

        Object.keys(mapper).forEach((mapperKey) => {
            result[mapperKey] = mapper[mapperKey] ? findDeep(data, mapper[mapperKey]) : null;
        });

        return result;
    }
}

export default FocusDataService;
