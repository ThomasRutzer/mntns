import { Component, Vue, Watch } from 'vue-property-decorator';
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
    private transition: boolean = false;

    @Watch('$route')
    routeChanged(to, from) {

        // apply transition only when
        // route changes anywhere FROM home (/)
        this.transition = from === '/';
    }
}