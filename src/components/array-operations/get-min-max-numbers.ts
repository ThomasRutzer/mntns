/**
 * expects a array with numbers which shall be examined.
 * Returns minValue  and maxValue
 *
 * @param {Number} numbers infinite count of numbers to examine
 * @return {[number, number]} where first index is minValue, and 2nd maxValue
 */
export default function getMinMaxNumbers( ...numbers: number[]) {
    let invalid = false;
    numbers.map((number) => {
       if (typeof number !== 'number') {
            invalid = true;
       }
    });

    return invalid === true ? [null, null] : [Math.min(...numbers), Math.max(...numbers)];
}