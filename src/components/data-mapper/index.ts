import DataMapper from './data-mapper';
import { DataMapperInterface } from './data-mapper-interface';
import { diContainer, types} from './../dependency-injection';

diContainer.bind<DataMapperInterface>(types.DataMapper).to(DataMapper);

export {
    DataMapperInterface,
    DataMapper,
};