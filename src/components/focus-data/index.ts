import { interfaces } from 'inversify';
import * as Generator from 'mntns-landscape/src/components/generator';

import { diContainer, types} from './../dependency-injection';

import { FocusDataServiceInterface } from './focus-data-service-interface';
import FocusDataService from './focus-data-service';

diContainer.bind<FocusDataServiceInterface>(types.FocusDataService).to(FocusDataService);
diContainer.bind<interfaces.Factory<FocusDataService>>(types.FocusDataServiceFactory).toFactory<FocusDataService>((context: interfaces.Context) => {
    return (landscapeId) => {
        const generatorManager = Generator.GeneratorManagerFactory.getById(landscapeId);
        const store = diContainer.get(types.Store);

        return new FocusDataService(store, generatorManager);
    };
});

export {
    FocusDataService,
    FocusDataServiceInterface,
};