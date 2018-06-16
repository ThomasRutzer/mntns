/**
 * class to cache [min,max] calculations,
 * which are used to map any data to shape
 * mntns
 */
import { DataMinMaxCacheServiceInterface } from './data-min-max-cache-service-interface';
import { injectable } from 'inversify';

@injectable()
class DataMinMaxCacheService implements DataMinMaxCacheServiceInterface {
    private cache: {
        [key: string]: {
            [key: string]: {
                min: number,
                max: number
            }
        }
    };

    constructor() {
        this.cache = {};
    }

    public cacheProperty(
        dataSetId: string,
        property: string,
        minMaxValues: {min: any,max: any}
    ) {
        if (!this.cache[dataSetId]) {
            this.cache[dataSetId] = {};
        }

        this.cache[dataSetId][property] = minMaxValues;
    }

    public clearEntireCache() {
        this.cache = {};
    }

    public clearCache(dataSetId: string) {
        if (this.cache[dataSetId]) {
            this.cache[dataSetId] = {};
        }
    }

    public getCachedProperty(dataSetId: string, property: string): {min: number, max: number}|null {
        if (this.cache[dataSetId] && this.cache[dataSetId][property]) {
            return this.cache[dataSetId][property]
        }

        return null;
    }

}

export default DataMinMaxCacheService;