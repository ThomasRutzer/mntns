import { getMinMaxNumbers } from "./../array-operations";
import max from 'date-fns/max';
import min from 'date-fns/min';
import differenceInDays from 'date-fns/difference_in_days';
/**
 * @note: currently all mapper-utils only work with flat (not nested) data
 */

// prevent retrieving range multiple times,
// where data and requested prop is the same
const minMaxCache: Object = {};

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
 * @param { String } value which will be parsed to a Date
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

export {
    getMinMaxValueTypeDate,
    getMinMaxTypeNumber,
    minMaxCache
}