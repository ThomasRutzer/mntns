import DataMinMaxCacheService from './data-min-max-cache-service';
import {DataMinMaxCacheServiceInterface} from "./data-min-max-cache-service-interface";
import { expect } from 'chai';

describe('DataMinMaxCache', () => {
    let cache: DataMinMaxCacheServiceInterface = null;

    beforeEach(() => {
        cache = new DataMinMaxCacheService();
    });

    it('properly caches values based on dataset id and property', () => {
        cache.cacheProperty('anyData', 'anyProperty', {min: 5, max: 10});
        expect(cache.getCachedProperty('anyData', 'anyProperty').min).to.equal(5);
        expect(cache.getCachedProperty('anyData', 'anyProperty').max).to.equal(10);
    });

    it('can clear whole cache', () => {
        cache.cacheProperty('anyData', 'anyProperty', {min: 5, max: 10});
        expect(cache.getCachedProperty('anyData', 'anyProperty').min).to.equal(5);
        expect(cache.getCachedProperty('anyData', 'anyProperty').max).to.equal(10);

        cache.clearEntireCache();
        expect(() => {
            cache.getCachedProperty('anyData', 'anyProperty').min
        }).to.throw();
        expect(cache.getCachedProperty('anyData', 'anyProperty')).to.equal(null);
    });

    it('can clear cache of requested dataset', () => {
        cache.cacheProperty('anyData', 'anyProperty', {min: 5, max: 10});
        cache.cacheProperty('anyData1', 'anyProperty', {min: 15, max: 20});

        cache.clearCache('anyData');
        expect(cache.getCachedProperty('anyData1', 'anyProperty').min).to.equal(15);
        expect(cache.getCachedProperty('anyData1', 'anyProperty').max).to.equal(20);
        expect(() => {
            cache.getCachedProperty('anyData', 'anyProperty').min
        }).to.throw();
        expect(cache.getCachedProperty('anyData', 'anyProperty')).to.equal(null);
    });

    it('overwrites existing values for same property and dataset', () => {
        cache.cacheProperty('anyData', 'anyProperty', {min: 5, max: 10});
        cache.cacheProperty('anyData', 'anyProperty', {min: 15, max: 20});

        expect(cache.getCachedProperty('anyData', 'anyProperty').min).to.equal(15);
        expect(cache.getCachedProperty('anyData', 'anyProperty').max).to.equal(20);
    });
});