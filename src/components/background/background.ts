import { Component, Vue } from 'vue-property-decorator';
import './background.scss';

@Component({
    template: require('./background.html'),
    computed: {
        isExpanded() {
            return this.$store.state.background.visibility === 1;
        },

        isActive() {
            return this.$store.state.background.activated;
        }
    },
})
export class BackgroundComponent extends Vue {
    // background size. Fullscreen appearance on true
    private isExpanded: boolean;

    // stores store state background activated.
    // basically, experiment interactions are disabled on
    // false
    private isActive: boolean;

    // true, when users does mouseover
    private isMouseover: boolean = false;

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
            this.expandTransition = from.path === '/experiments' || to.path === '/experiments';

            next();
        });
    }

    onMouseover() {
        this.isMouseover = true;
    }

    onMouseout() {
        this.isMouseover = false;
    }
}