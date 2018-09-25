import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { types } from './../dependency-injection';
import { DataMapperServiceInterface } from './data-mapper-service-interface';
import * as mapperUtils from './mapper-utils';
import { MapperInterface } from './mapper-interface';
import { findDeep } from './../object-utils';
import differenceInDays from 'date-fns/difference_in_days';
import { DataMinMaxCacheServiceInterface } from './../caches/data-min-max-cache-service-interface';
import { firstLetterUppercase } from './../string-operations';

/**
 * DataMapper maps given data to specified output data.
 * Mapping is configured by mappers
 */
@injectable()
class DataMapperService implements DataMapperServiceInterface {
    private dataMinMaxCache: DataMinMaxCacheServiceInterface;

    constructor(
        @inject(types.DataMinMaxCache) dataMinMaxCache,
    ) {
        this.dataMinMaxCache = dataMinMaxCache;
    }

    /**
     * @param {data: any[], cacheId: string} dataSet actual set of data which will be mapped
     * @param {MapperInterface[]} mappers a list of mappers to map data
     * @return {Object[]} with mapped data
     */
    map(dataSet: {cacheId?: string, data: any[]}, mappers: MapperInterface[]): Object[] {
        const mappedData: Object[] = [];


        dataSet.data.forEach((dateEntry, index) => {
            const mappedValues = {};

            mappers.forEach((mapper) => {
                let min, max, value;

                const cachedValues = this.dataMinMaxCache.getCachedProperty(dataSet.cacheId, mapper.dataKey[mapper.dataKey.length - 1]);

                if (cachedValues) {
                    min = cachedValues.min;
                    max = cachedValues.max;
                } else {
                    // applied some "magic" here, by calling matching
                    // mapper based on its type,e.g. getMinMaxTypeNumber
                    const util = `getMinMaxType${firstLetterUppercase(mapper.type)}`;
                    [min, max] = mapperUtils[util](dataSet.data, mapper.dataKey);

                    this.dataMinMaxCache.cacheProperty(dataSet.cacheId, mapper.dataKey[mapper.dataKey.length - 1], {min, max});
                }

                // determine value, considering mapper type
                switch ( mapper.type ) {
                    case 'number':
                        value = findDeep(dateEntry, mapper.dataKey);
                        break;

                    case 'date':
                        const maxAsDate = max;
                        max = differenceInDays(maxAsDate, min);
                        min = 0;
                        value = differenceInDays(maxAsDate, new Date(findDeep(dateEntry, mapper.dataKey)));
                        break;

                    case 'string':
                        value = findDeep(dateEntry, mapper.dataKey).length;
                        break;
                }

                // map value from range determined from data values to requested
                mappedValues[mapper.mountainsParameter] = mapperUtils.rangeMapper(
                    value,
                    min,
                    max,
                    mapper.min,
                    mapper.max
                );
            });

            mappedData.push({
                id: dateEntry.id ? `${dateEntry.id}` : index,
                ...mappedValues
            });
        });

        this.dataMinMaxCache.clearEntireCache();
        return mappedData;
    }
}

export default DataMapperService;