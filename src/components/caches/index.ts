import { diContainer, types} from './../dependency-injection';
import { DataMinMaxCacheServiceInterface } from "./data-min-max-cache-service-interface";
import DataMinMaxCacheService from './data-min-max-cache-service';

diContainer.bind<DataMinMaxCacheServiceInterface>(types.DataMinMaxCache).to(DataMinMaxCacheService).inSingletonScope();
