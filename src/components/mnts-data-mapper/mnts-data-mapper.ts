import { injectable } from "inversify";
import "reflect-metadata";
import { MntsDataMapperInterface } from "./mnts-data-mapper-interface";
import * as mapperUtils from './mapper-utilts';
import rangeMapper from './../mnts/range-mapper';

@injectable()
class MntsDataMapper implements MntsDataMapperInterface {

    /**
     * @param {any[]} data actually set of data which will be mapped to visualize Mountains
     * @return {Object[]} with mapped data
     */
    mapRepos(data: any[], mappers: any[]): Object[] {
        const mappedData: Object[] = [];

        data.forEach((dataSet) => {
            const mappedValues = {};

            mappers.forEach((mapper) => {
                let min, max, value;

                // request range, considering mapper type
                if(mapper.type === 'number') {
                    [min, max] = mapperUtils.getMinMaxTypeNumber(data, mapper.dataKey);
                    value = dataSet[mapper.dataKey];
                } else if (mapper.type === 'date') {
                    [min, max, value] = mapperUtils.getMinMaxValueTypeDate(data, mapper.dataKey, dataSet[mapper.dataKey]);
                }

                // map value from range determined from data values to requested
                mappedValues[mapper.mountainsParameter] = rangeMapper(
                    value,
                    min,
                    max,
                    mapper.min,
                    mapper.max
                );
            });

            mappedData.push(mappedValues);
        });

        return mappedData;
    }
}

export default MntsDataMapper;