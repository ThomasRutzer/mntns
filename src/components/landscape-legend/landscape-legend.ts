/**
 * Component displays data of current active
 * level based on matching dataMapper as a
 * legend
 */
import { Component, Vue, Watch } from 'vue-property-decorator';
import * as dataMappers from './../data-mapper/mappers';

@Component({
    template: require('./landscape-legend.html')
})

export class LandscapeLegendComponent extends Vue {
    @Watch('$store.state.levels.currentLevel')
    updateLegendData(val?, oldVal?) {
        if (!val || val === oldVal) return;

        const title = this.$store.state.levels.currentLevel.title;

        // filter mapper based on @property dataSrc of LevelsModelInterface
        let currentMapper = dataMappers[`${ this.$store.state.levels.currentLevel.dataSrc}Mappers`];
        this.legendData.length = 0;

        currentMapper.forEach((mapper) => {
            this.legendData.push({
                label: mapper.mountainsParameter,
                value: `${title}→${mapper.dataKey.join('→')}`
            });
        });
    }

    private legendData: {label: string, value: any}[] = [];

    created() {
        this.updateLegendData(this.$store.state.levels.currentLevel);
    }
}
