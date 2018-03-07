import 'mnts/src/components/generator';
import { MntsComponent} from "./mnts";
import { MntsServiceInterface} from "./mnts-service-interface";
import MntsService from './mnts-service';
import { diContainer, types} from './../dependency-injection';

diContainer.bind<MntsServiceInterface>(types.MntnsService).to(MntsService);

export {
    MntsComponent,
    MntsService,
    MntsServiceInterface
};