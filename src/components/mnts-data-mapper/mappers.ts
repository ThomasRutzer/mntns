import MountainConfig from 'mnts/src/components/mountain/MountainConfig';

/**
 * strong bound mappers; only work when actually mapping
 * Githup API data to Mountain Parameters.
 *
 * @type { Array.<Object>}
 *
 * @Object
 * @property { Array.<String> } dateKey as path matching object structure
 * @property { String } height is any parameter to visualize Mountain.
 * @property { Number } min is minValue of this parameter
 * @property { Number } max is maxValue of this parameter
 * @property { String } type is type of dataKey, to use right mapping methods
 */
const repoMappers = [
    {
        dataKey: ["size"],
        mountainsParameter: "height",
        min: MountainConfig.parameters.height.min,
        max: MountainConfig.parameters.height.max,
        type: "number",
    },

    {
        dataKey: ["created_at"],
        mountainsParameter: "xPos",
        min: 5,
        max: 100,
        type: "date",
    },

    {
        dataKey: ["pushed_at"],
        mountainsParameter: "yPos",
        min: 5,
        max: 100,
        type: "date",
    }
];

const commitMappers = [
    {
        dataKey: ["commit", "author", "date"],
        mountainsParameter: "height",
        min: 5,
        max: 100,
        type: "date",
    }
];

export {
    repoMappers,
    commitMappers
};