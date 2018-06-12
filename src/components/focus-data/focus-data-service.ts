/**
 * class FocusDataService handles
 * intersected data from 3D-Landscape
 * and commits filtered matching data set
 * to Store
 */
import { Store } from 'vuex';
import * as mutationTypes from '../../store/mutation-types';
import { injectable, inject } from 'inversify';
import types from '../dependency-injection/types';

import { FocusDataServiceInterface } from './focus-data-service-interface';
import GeneratorManagerInterface from 'mntns-landscape/src/components/generator/manager/GeneratorManagerInterface';

@injectable()
class FocusDataService implements FocusDataServiceInterface {
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
                raw: raw[0],
                mapped: mapped[0],
                id: id
            });
        } else {
            this.store.commit(mutationTypes.UNFOCUS_REPO);
        }
    }

    // @todo: move this to another service
    public setCameraToStart() {
        this.generatorManager.setCamera('start');
    }
}

export default FocusDataService;
