import MountainConfig from 'mntns-landscape/src/components/mountain/mountainConfig';
import GeneratorConfig from 'mntns-landscape/src/components/generator/generatorManagerConfig';
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
const reposMappers: MapperInterface[] = [
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
        min: GeneratorConfig.layout.position.x.min,
        max: GeneratorConfig.layout.position.x.max,
        type: 'date',
    },

    {
        dataKey: ['pushed_at'],
        mountainsParameter: 'z',
        min: GeneratorConfig.layout.position.z.min,
        max: GeneratorConfig.layout.position.z.max,
        type: 'date',
    }
];

const commitsMappers: MapperInterface[] = [
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
    reposMappers,
    commitsMappers
};
