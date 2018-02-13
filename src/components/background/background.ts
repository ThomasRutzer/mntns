import { Component, Vue } from 'vue-property-decorator';
import './background.scss';

@Component({
    template: require('./background.html'),
    computed: {
        isExpanded() {
            return this.$store.state.backgroundVisibility === 1;
        }
    },
})
export class BackgroundComponent extends Vue {

}