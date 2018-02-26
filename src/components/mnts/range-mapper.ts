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
export  default function rangeMapper(value: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}