import {Component, Vue} from 'vue-property-decorator';

@Component({
    template: require('./mntns-level-navigation.html'),
    computed: {
        /**
         * @return  { Object } level
         */
        currentLevel() {
            return this.$store.state.mntns.levels.allLevels.filter((level) => {
                return level.index === this.$store.state.mntns.levels.currentLevel;
            })[0];
        },

        progress() {
            return (100 / this.$store.state.mntns.levels.allLevels.length) * this.$store.state.mntns.levels.currentLevel;
        }
    }
})

export class MntnsLevelNavigation extends Vue {

}