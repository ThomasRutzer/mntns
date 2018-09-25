import LevelModel from '../components/levels/level-model/level-model';
import { ExtractedFocusDataInterface } from '../components/focus-data/extracted-focus-data-interface';

export interface StateInterface {
    experimentContainer: {
        /**
         * defines visibility of component, which Router
         * renders into router-view=experimentContainer
         *
         * @property {number}
         * @value 0 experimentContainer component is visible in reduced size
         * @value 1 experimentContainer is visible and expanded
         */
        visibility: number,

        /**
         * whether experimentContainer component is active or not.
         */
        activated: boolean,

        /**
         * if true, css-prop pointer-events none will be
         * applied to content area
         */
        clickable: boolean
    },

    /**
     * route specifc data
     */
    currentRoute: {
        titleAnimatedIn: boolean,
        footerVisible: boolean
    },

    gitHubData: {
        userName: string,
        startedLoading: boolean,
        finishedLoading: boolean,
        loadingError: boolean,

        startedMapping: boolean,
        finishedMapping: boolean,

        /**
         * repo which will be shown in detail
         * @type { Object }
         * @property { Object } raw data
         * @property { Object } mapped data
         * @property { String } id
         * @property { ExtractedFosucInterface } extracted
         */
        focusedData: {
            raw: object,
            mapped: object,
            id: string,
            extracted: ExtractedFocusDataInterface
        },

        /**
         * dataset, visualized by mntns
         */
        usedData: {
            raw: object,
            mapped: object,
            // dataSrc, defined
            // in each LevelModel
            dataSrc: string
        },

        repos: {
            /**
             * mapped repos to match mntns interface
             */
            mapped: object,

            /**
             * stores retrieved repos from GitHub,
             */
            raw: object,
        },

        commits: object
    },

    levels: {
        currentLevel: LevelModel,
    },

    /**
     * stores currently active Modal name
     */
    activeModal: string
}
