import { injectable } from "inversify";
import "reflect-metadata";
import { DataMapperInterface } from "./data-mapper-interface";
import * as mapperUtils from './mapper-utilts';
import { findDeep } from './../object-utils';
import { capitalize } from './../string-operations';

/**
 * DataMapper maps given data to specified output data.
 * Mapping is configured by mappers
 * @todo: implement mapper model
 */
@injectable()
class DataMapper implements DataMapperInterface {

    /**
     * @param {any[]} data actual set of data which will be mapped
     * @param {any[]} mappers a list of mappers to map data
     * @return {Object[]} with mapped data
     */
    map(data: any[], mappers: any[]): Object[] {
        const mappedData: Object[] = [];

        data.forEach((dataSet, index) => {
            const mappedValues = {};

            mappers.forEach((mapper, i) => {
                let min, max, value;

                // determine range, considering mapper type
                switch(mapper.type) {
                    case 'number':
                        [min, max] = mapperUtils.getMinMaxTypeNumber(data, mapper.dataKey[mapper.dataKey.length - 1]);
                        value = dataSet[mapper.dataKey];
                        break;

                    case 'date':
                        [min, max, value] = mapperUtils.getMinMaxValueTypeDate(data, mapper.dataKey, findDeep(dataSet, mapper.dataKey));
                        break;

                    case 'string':
                        [min, max] = mapperUtils.getMinMaxTypeString(data, mapper.dataKey);
                        value = findDeep(dataSet, mapper.dataKey).length;
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
                id: dataSet.id ? `${dataSet.id}` : index,
                ...mappedValues
            });
        });

        return mappedData;
    }
}

export default DataMapper;