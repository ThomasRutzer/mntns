import { getMinMaxNumbers } from './../array-operations';
import { findDeep } from './../object-utils';
import max from 'date-fns/max';
import min from 'date-fns/min';

/**
 * get range when incoming property is of type Date
 * @param {any[]} data all data
 * @param {string} property property of data to retrieve range from
 * @return {[number, number]} where first index is minValue, and 2nd maxValue
 */
function getMinMaxTypeNumber(data: any[], property: string[]): number[]|null {
    const numbers = data.map((value) => {
        return Number(findDeep(value, property));
    });

    return getMinMaxNumbers( ...numbers );
}

/**
 *
 * @param {any[]} data all data
 * @param {string[]} path to property of data to retrieve range from
 * @return {[number, number]} where first index is minValue, and 2nd maxValue
 */
function getMinMaxTypeDate(data: Object[], property: string[]): any[]|null {
    const dates = data.map((value) => {
        return new Date(findDeep(value, property));
    });

    const minDate = min( ...dates );
    const maxDate = max( ...dates );

    return [minDate, maxDate];
}

/**
 * examines string length of given property
 * @param {any[]} data all data
 * @param {string} property property of data to retrieve range from
 * @return {number[]} where first index is minValue, and 2nd maxValue
 */
function getMinMaxTypeString(data: any[], property: string[]): number[]|null {
    const numbers = data.map((value) => {
        // @ts-ignore
        return findDeep(value, property).length;
    });

    return getMinMaxNumbers( ...numbers );
}

/**
 * maps a value relatively from a given range into another oth
 * e.g.: 5 in range 0 - 5 equals 100 in range 0 - 100
 *
 * @param {number} value
 * @param {number} in_min
 * @param {number} in_max
 * @param {number} out_min
 * @param {number} out_max
 * @return {number} mapped value
 */
function rangeMapper(value: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export {
    getMinMaxTypeDate,
    getMinMaxTypeNumber,
    getMinMaxTypeString,
    rangeMapper,
};