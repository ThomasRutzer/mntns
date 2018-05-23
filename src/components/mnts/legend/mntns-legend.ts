import { Component, Vue, Watch } from 'vue-property-decorator';
import { repoMappers, commitMappers } from '../../data-mapper/mappers';

@Component({
    template: require('./mntns-legend.html')
})

export class MntnsLegendComponent extends Vue {
    @Watch('$store.state.levels.currentLevel')
    updateLegendData(val?, oldVal?) {
        if (val === oldVal) return;

        const level = val;
        const title = this.$store.state.levels.allLevels[this.$store.state.levels.currentLevel - 1].title;
        let currentMapper;

        this.legendData.length = 0;

        switch (level) {
            case 1:
                currentMapper = repoMappers;
                break;

            case 2:
                currentMapper = commitMappers;
                break;
        }

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