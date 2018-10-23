/**
 * Component displays data of current active
 * level based on matching dataMapper as a
 * legend
 */
import { Component, Vue } from 'vue-property-decorator';

@Component({
    template: require('./landscape-legend.html'),
    computed: {
        legendData() {
            return this.$store.state.experimentContainer.legend;
        },
    }
})

export class LandscapeLegendComponent extends Vue {}
