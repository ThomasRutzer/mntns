import * as dataMappers from './../data-mapper/mappers';
import LegendItemModel from './legend-item-model/legend-item-model';
import {StateInterface} from '../../store/state-interface';

function LegendFactory(state: StateInterface): LegendItemModel[] {
    const title = state.levels.currentLevel.title;

    // filter mapper based on @property dataSrc of LevelsModelInterface
    let currentMapper = dataMappers[`${ state.levels.currentLevel.dataSrc}Mappers`];
    const legendData = [];

    currentMapper.forEach((mapper) => {
        legendData.push(
            new LegendItemModel(mapper.mountainsParameter, `${title}→${mapper.dataKey.join('→')}`)
        );
    });

    return legendData;
}

export default LegendFactory;
