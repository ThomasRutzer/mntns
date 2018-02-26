//@todo: fix config
//import { MountainConfig } from './../../../node_modules/mnts/src/components/mountain/';

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
        min: 0,
        max: 50,
        type: "number",
    },

    {
        dataKey: "created_at",
        mountainsParameter: "xPos",
        min: 5,
        max: 100,
        type: "date",
    },

    {
        dataKey: "pushed_at",
        mountainsParameter: "yPos",
        min: 5,
        max: 100,
        type: "date",
    }
];

export default mappers;