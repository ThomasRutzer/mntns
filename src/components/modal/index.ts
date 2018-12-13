import Vue from 'vue';
import { diContainer, types} from './../dependency-injection';
import modalTrigger from './modal-trigger';
import { ModalServiceInterface } from './modal-service-interface';
import ModalService from './modal-service';
import { ModalComponent } from './modal';

diContainer.bind<ModalServiceInterface>(types.ModalService)
    .to(ModalService).inSingletonScope();

Vue.component('modal', ModalComponent);
// @ts-ignore
Vue.directive('modal-trigger', modalTrigger);