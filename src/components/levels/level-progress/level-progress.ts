import {Component, Vue} from 'vue-property-decorator';

@Component({
    template: require('./level-progress.html'),
    computed: {
        /**
         * @return  { LevelModel } currentLevel
         */
        currentLevel() {
            return this.$store.state.levels.currentLevel;
        },
    }
})

export class LevelProgress extends Vue {

}
