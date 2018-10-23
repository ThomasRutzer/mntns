import Vue from 'vue';
import { interfaces } from 'inversify';
import { LandscapeLegendComponent } from './landscape-legend';
import { diContainer, types } from './../dependency-injection';
import LegendItemModelInterface from './legend-item-model/legend-item-model-interface';
import LegendItemModel from './legend-item-model/legend-item-model';
import LegendFacory from './legend-factory';

diContainer.bind<interfaces.Factory<LegendItemModelInterface>>(types.LegendItemFactory)
    .toFactory<LegendItemModel[]>((context: interfaces.Context) => {
        const store: any = context.container.get(types.Store);
        return () => {
            return LegendFacory(store.state);
        };
    });
Vue.component('landscape-legend', LandscapeLegendComponent);
