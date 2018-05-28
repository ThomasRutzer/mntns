import { Store } from 'vuex';
import {MntsServiceInterface} from './mnts-service-interface';
import { injectable, inject } from 'inversify';
import GeneratorManagerInterface from 'mntns-landscape/src/components/generator/manager/GeneratorManagerInterface';
import * as mutationTypes from './../../store/mutation-types';
import types from '../dependency-injection/types';

@injectable()
class MntsService implements MntsServiceInterface {
    private store: Store<any>;
    private generatorManager: GeneratorManagerInterface = null;

    constructor(
        @inject(types.Store) store,
        GeneratorManager: GeneratorManagerInterface
    ) {
        this.store = store;
        this.generatorManager = GeneratorManager;
    }

    public focusData(id: string) {

        let raw, mapped;

        raw = this.store.state.gitHubData.usedData.raw.filter((data) => {
            return data.id.toString() === id;
        });

        mapped = this.store.state.gitHubData.usedData.mapped.filter((data) => {
            return data.id === id;
        });

        if (raw.length > 0) {

            this.store.commit(mutationTypes.FOCUS_REPO, {
                event,
                raw: raw[0],
                mapped: mapped[0],
                id: id
            });

        } else {
            this.store.commit(mutationTypes.UNFOCUS_REPO);
        }
    }

    public setCameraToStart() {
        this.generatorManager.setCamera('start');
    }
}

export default MntsService;
