import {Component, Vue, Watch, Prop, Provide} from 'vue-property-decorator';
import { types, diContainer } from './../dependency-injection';

import { mutationTypes } from './../../store';

import { FocusDataServiceInterface } from '../focus-data/';
import { LevelsServiceInterface } from './../levels';
import config from './mnts-config';
import { ModalServiceInterface } from '../modal/modal-service-interface';
import GeneratorManagerInterface from 'mntns-landscape/src/components/generator/manager/GeneratorManagerInterface';
import * as Generator from 'mntns-landscape/src/components/generator';
import { MntnsModalComponent } from './modal/mntns-modal';

@Component({
    template: require('./mnts.html'),
    components: {
        'mntns-modal': MntnsModalComponent
    },
    computed: {
        activeModal() {
            return this.$store.state.activeModal === this.modalName;
        },

        extractedFocusData() {
            return this.$store.state.gitHubData.focusedData.extracted;
        },

        level() {
            return  this.$store.state.levels.currentLevel;
        },

        isActivated() {
            if (this.$store.state.experimentContainer.activated) {
                this.generatorManager.setCamera('start');
            }

            return this.$store.state.experimentContainer.activated;
        }
    },
})
export class MntsComponent extends Vue {
    private activeModal: boolean;

    /**
     * @type {Array} data > stores data to visualize mntns
     */
    private data: any[] = [];

    private isActivated: boolean;
    private labelPos: {
        x?: number,
        y?: number,
        outside?: boolean,
    } = {};

    private focusDataService: FocusDataServiceInterface;
    private levelsService: LevelsServiceInterface;
    private modalService: ModalServiceInterface;
    private generatorManager: GeneratorManagerInterface;

    @Prop({default: 'mntns-scene1'})
    mId: string;

    @Provide()
    modalName: string = 'mntns-detailed-data';

    @Watch('$store.state.currentRoute.titleAnimatedIn')
    watchHandler() {
        this.dataWatcher();
    }

    @Watch('$store.state.gitHubData.usedData.mapped')
    dataWatcher() {
        if (!this.$store.state.currentRoute.titleAnimatedIn) return;

        this.data = this.$store.state.gitHubData.usedData.mapped;
    }

    beforeDestroy() {
        this.$store.commit(mutationTypes.DEACTIVATE_EXPERIMENT_CONTAINER);
        this.$store.commit(mutationTypes.UNFOCUS_REPO);
    }

    async mounted() {
        this.$store.commit(mutationTypes.DEACTIVATE_EXPERIMENT_CONTAINER);

        this.focusDataService = diContainer.get<FocusDataServiceInterface>(types.FocusDataService);

        // currently from external npm-module
        // and not injectable
        this.generatorManager = Generator.GeneratorManagerFactory.getById(this.mId);

        // @ts-ignore: Cannot invoke an expression whose type lacks a call signature.
        // Type 'LevelsServiceInterface' has no compatible call signatures
        this.levelsService = diContainer.get<LevelsServiceInterface>(types.LevelsServiceFactory)();
        await this.levelsService.start();

        this.modalService = diContainer.get<ModalServiceInterface>(types.ModalService);
    }

    back() {
        this.levelsService.previousStep();
        this.clearDetailedData();
    }

    forwards() {
        this.levelsService.nextStep();
        this.clearDetailedData();
    }

    clearDetailedData() {
        if (this.activeModal) {
            this.modalService.close();
        }
    }

    updateDetailedData(): void {
        if (!this.activeModal) {
            this.modalService.open(this.modalName);
        }
    }

    clearLabel()  {
        this.labelPos = {};
    }

    updateLabel(position: {x: number, y: number}) {
        this.labelPos = {};
        this.labelPos.outside = position.x > (window.innerWidth / 2);

        this.labelPos.x = position.x;
        this.labelPos.y = position.y;
    }

    /**
     * @todo: refactoring required. Try to get rid of nested if conditions
     * @param { SceneIntersectionModel } data
     */
    onIntersection(data: any) {

        // display no intersection
        // when deactivated...
        if (!this.isActivated) {
            return;
        }

        // close detailedData on another mousedown
        // and return...
        if (this.activeModal && data.event.type === config.eventToUpdateLevel) {
            // this.clearDetailedData();
            return;
        }

        // ...or return when detailedData is displayed
        // and no other mousedown caught
        if (this.activeModal) {
            return;
        }

        // certain scene objects might not be focused
        if (config.excludedFocusableObjectIds.indexOf(data.object.name) !== -1) {
            this.clearLabel();
            return;
        }

        this.focusDataService.commitFocusedData(data.object.name);

        if (data.event.type === config.eventToUpdateLevel) {
            this.clearLabel();
            this.updateDetailedData();
        } else {
            this.clearDetailedData();

            if (data.event.type === 'mousemove') {
                this.updateLabel({x: data.event.x, y: data.event.y});
            }
        }
    }
}
