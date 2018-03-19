import {Component, Vue} from 'vue-property-decorator';
import { types, diContainer } from "./../dependency-injection";

import { MntsServiceInterface } from "./mnts-service-interface";

@Component({
    template: require('./mntns-level-navigation.html'),
    computed: {
        /**
         * @return  { Object } level
         */
        currentLevel() {
            return this.$store.state.mntns.levels.allLevels.filter((level) => {
                return level.index === this.$store.state.mntns.levels.currentLevel;
            })[0]
        },

        progress() {
            return (100 / this.$store.state.mntns.levels.allLevels.length) * this.$store.state.mntns.levels.currentLevel;
        }
    }
})

export class MntnsLevelNavigation extends Vue {
    private mntnsService: MntsServiceInterface;

    created() {
        this.mntnsService = diContainer.get(types.MntnsService)
    }

    goBack() {
        if (this.currentLevel.index <= 1) {
            return;
        }

        this.mntnsService.previousStep();
    }
}