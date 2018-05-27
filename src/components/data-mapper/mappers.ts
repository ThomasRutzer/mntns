import MountainConfig from 'mntns-landscape/src/components/mountain/mountainConfig';
import {MapperInterface} from './mapper-interface';

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
 * @property { String } type is type of dataKey, to use matching mapping methods
 */
const repoMappers: MapperInterface[] = [
    {
        dataKey: ['size'],
        mountainsParameter: 'height',
        min: MountainConfig.parameters.height.min,
        max: MountainConfig.parameters.height.max,
        type: 'number',
    },

    {
        dataKey: ['created_at'],
        mountainsParameter: 'x',
        min: -400,
        max: 400,
        type: 'date',
    },

    {
        dataKey: ['pushed_at'],
        mountainsParameter: 'z',
        min: -400,
        max: 400,
        type: 'date',
    }
];

const commitMappers: MapperInterface[] = [
    {
        dataKey: ['commit', 'author', 'date'],
        mountainsParameter: 'x',
        min: -400,
        max: 400,
        type: 'date',
    },

    {
        dataKey: ['commit', 'message'],
        mountainsParameter: 'height',
        min: MountainConfig.parameters.height.min,
        max: MountainConfig.parameters.height.max,
        type: 'string',
    }
];

export {
    repoMappers,
    commitMappers
};
