import { interfaces } from 'inversify';
import * as Generator from 'mntns-landscape/src/components/generator';

import { diContainer, types} from './../dependency-injection';

import { ExtractedFocusDataInterface } from './extracted-focus-data-interface';

import { FocusDataServiceInterface } from './focus-data-service-interface';
import FocusDataService from './focus-data-service';

diContainer.bind<FocusDataServiceInterface>(types.FocusDataService).to(FocusDataService);

export {
    ExtractedFocusDataInterface,
    FocusDataService,
    FocusDataServiceInterface,
};