import {Component, Vue} from 'vue-property-decorator';

@Component({
    template: require('./level-progress.html'),
    computed: {
        /**
         * @return  { Object } level
         */
        currentLevel() {
            return this.$store.state.levels.allLevels.filter((level) => {
                return level.index === this.$store.state.levels.currentLevel;
            })[0];
        },

        /**
         *
         * @return { number } levels progress
         */
        progress() {
            return (100 / this.$store.state.levels.allLevels.length) * this.$store.state.levels.currentLevel;
        }
    }
})

export class LevelProgress extends Vue {

}