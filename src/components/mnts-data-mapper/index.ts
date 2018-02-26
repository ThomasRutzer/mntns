import MntsDataMapper from './mnts-data-mapper';
import { MntsDataMapperInterface } from './mnts-data-mapper-interface';
import { diContainer, types} from './../dependency-injection';

diContainer.bind<MntsDataMapperInterface>(types.MntsDataMapper).to(MntsDataMapper);

export {
    MntsDataMapperInterface,
    MntsDataMapper,
};