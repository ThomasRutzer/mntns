import { injectable } from "inversify";
import "reflect-metadata";
import { MntsDataMapperInterface } from "./mnts-data-mapper-interface";
import { getMinMaxNumbers } from "./../array-operations";
import { MountainConfig } from './../../../node_modules/mnts/src/components/mountain/';
import rangeMapper from './range-mapper';
import max from 'date-fns/max';
import min from 'date-fns/min';
import differenceInDays from 'date-fns/difference_in_days';

/**
 * strong bound mappers; only work when actually mapping
 * Githup API data to Mountain Parameters.
 * Adjust this Array, to map other data.
 *
 * @type { Array.<Object>}
 *
 * @Object
 * @property { String } dateKey is any property of incoming data
 * @property { String } height is any parameter to visualize Mountain.
 * @property { Number } min is minValue of this parameter
 * @property { Number } max is maxValue of this parameter
 * @property { String } type is type of dataKey, to use right mapping methods
 */
const mappers = [
    {
        dataKey: "size",
        mountainsParameter: "height",
        min: MountainConfig.parameters.height.min,
        max: MountainConfig.parameters.height.max,
        type: "number"
    },

    {
        dataKey: "created_at",
        mountainsParameter: "xPos",
        min: 5,
        max: 100,
        type: "date"
    },

    {
        dataKey: "pushed_at",
        mountainsParameter: "yPos",
        min: 5,
        max: 100,
        type: "date"
    }
];

// prevent retrieving range multiple times,
// where data and requested prop is the same
const minMaxCache: Object = {};

@injectable()
class MntsDataMapper implements MntsDataMapperInterface {

    /**
     * @param {any[]} data actually set of data which will be mapped to visualize Mountains
     * @return {Object[]} with mapped data
     */
    mapRepos(data: any[]): Object[] {
        const mappedData: Object[] = [];

        data.forEach((dataSet) => {
            const mappedValues = {};

            mappers.forEach((mapper) => {
                let min, max, value;

                // request range, considering mapper type
                if(mapper.type === 'number') {
                    [min, max] = getMinMaxTypeNumber(data, mapper.dataKey);
                    value = dataSet[mapper.dataKey];
                } else if (mapper.type === 'date') {
                    [min, max, value] = getMinMaxValueTypeDate(data, mapper.dataKey, dataSet[mapper.dataKey]);
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

/**
 * @note: currently all mappers only work with flat (not nested) data
 */
/**
 * get range when incoming property is of type Date
 * @param {any[]} data all data
 * @param {string} property property of data to retrieve range from
 * @return {[number, number]} where first index is minValue, and 2nd maxValue
 */
function getMinMaxTypeNumber(data: any[], property: string): number[]|null {
    if(!minMaxCache[property]) {
        const numbers = data.map((value) => {
            return Number(value[property]);
        });

        minMaxCache[property] = getMinMaxNumbers( ...numbers );
    }

    return minMaxCache[property];
}

/**
 *
 * @param {any[]} data all data
 * @param {string} property property of data to retrieve range from
 * @param value
 * @return {[number, number, number]} where first index is minValue, and 2nd maxValue and 3rd value as number not Date
 */
function getMinMaxValueTypeDate(data: any[], property: string, value: any): number[]|null {
    if(!minMaxCache[property]) {
        const dates = data.map((value) => {
            return new Date(value[property]);
        });

        const minDate = min( ...dates );
        const maxDate = max( ...dates );
        const diff = differenceInDays(maxDate, minDate);

        minMaxCache[property] = {
            minDate: minDate,
            maxDate: maxDate,
            range: diff
        };
    }

    const parsedValue = differenceInDays(minMaxCache[property].maxDate, new Date(value));
    return [0, minMaxCache[property].range, parsedValue];
}

export default MntsDataMapper;