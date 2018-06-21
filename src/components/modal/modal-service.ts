import { injectable, inject } from 'inversify';
import types from '../dependency-injection/types';
import * as mutationTypes from '../../store/mutation-types';
import { Store } from 'vuex';
import { ModalServiceInterface } from './modal-service-interface';

@injectable()
class ModalService implements ModalServiceInterface {

    private store: Store<any>;
    private registeredModals: string[] = [];

    /**
     * stores current open modal
     */
    private openModal: string = null;

    private lastFocus: Element = null;

    constructor(
        @inject(types.Store) store,
    ) {
        this.store = store;
    }

    public register(id: string) {
        if (this.registeredModals.indexOf(id) !== -1) {
            console.log(`Modal with id: "${id}" already registered`);
            return;
        }

        this.registeredModals.push(id);
    }

    public getRegistered(): string[] {
        return this.registeredModals;
    }

    public unregister(id: string): void {
        const index: number = this.registeredModals.indexOf(id);
        if (index === -1) return;

        this.registeredModals.splice(index, 1);

    }

    public open(id: string) {
        if (this.registeredModals.indexOf(id) === -1) return;
        if (this.openModal === id) return;

        if (this.openModal) {
            this.close();
        }

        this.openModal = id;
        this.lastFocus = document.activeElement;
        this.updateWindowLocation();
        this.bindPopstateListener();

        this.emitOpen();
    }

    public close() {
        // @ts-ignore  Property 'focus' does not exist on type 'Element'.
        this.lastFocus.focus();
        this.openModal = null;
        this.emitClose();
    }

    private emitClose() {
        this.store.commit(mutationTypes.CLOSE_MODAL);
    }

    private emitOpen() {
        const data = {name: this.openModal};
        this.store.commit(mutationTypes.OPEN_MODAL, data);
    }

    private bindPopstateListener() {
        window.addEventListener('popstate', () => {
            this.close();
        });
    }

    /**
     * any history.back() shall close
     * current open modal
     */
    private updateWindowLocation() {
        history.pushState(null, null);
    }
}

export default ModalService;