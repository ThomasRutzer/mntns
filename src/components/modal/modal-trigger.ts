/**
 * will be added as vue directive.
 * Binding must be identifier of
 * a modal component, which is
 * added to HTML
 *
 * Usage example:
 *
 * <button v-modal-trigger="'name'">Test modal</button>
 */
import { types, diContainer } from './../dependency-injection';
import { ModalServiceInterface } from './modal-service-interface';

export default {
    inserted(el: HTMLElement, binding: { value: string }) {
        let modalService: ModalServiceInterface = diContainer.get(types.ModalService);

        el.addEventListener('click', () => {
            modalService.open(binding.value);
        });
    },
};
