import {Component, Vue, Watch, Prop, Provide} from 'vue-property-decorator';
import { types, diContainer } from '../../dependency-injection';

import { mutationTypes } from '../../../store';

import { FocusDataServiceInterface } from '../../focus-data';
import { LevelsServiceInterface } from '../../levels';
import config from '../mnts-config';
import { ModalServiceInterface } from '../../modal/modal-service-interface';
import GeneratorManagerInterface from 'mntns-landscape/src/components/generator/manager/GeneratorManagerInterface';
import * as Generator from 'mntns-landscape/src/components/generator';

@Component({
    template: require('./mntns-modal.html'),
    computed: {
        extractedFocusData() {
            return this.$store.state.gitHubData.focusedData.extracted;
        },

        level() {
            return this.$store.state.levels.currentLevel;
        },

        legend() {
            return this.$store.state.experimentContainer.legend;
        }
    }
})
export class MntnsModalComponent extends Vue {}
