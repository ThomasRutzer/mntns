export interface ModalServiceInterface {
    register(id: string);
    getRegistered(): string[];
    unregister(id: string): void;
    open(id: string);
    close();
}
