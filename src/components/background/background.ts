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
    // actual transition of background component for
    // route specific component inside router-view=background
    // only apply this transition, when route context is "/" (home)
    private transition: boolean = true;

    // actual expanding transition of
    // route specific component inside router-view=background
    private expandTransition: boolean = false;

    created() {
        this.$router.beforeEach((to, from, next) => {
            this.transition = from.path === '/' || to.path === '/';
            this.expandTransition = from.path === '/mnts' || to.path === '/mnts';

            next();
        })
    }
}