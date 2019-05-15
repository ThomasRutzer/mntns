import { Component, Vue } from 'vue-property-decorator';
import './experiment-container.scss';

@Component({
    template: require('./experiment-container.html'),
    computed: {
        isExpanded() {
            return this.$store.state.experimentContainer.visibility === 1;
        },

        isActive() {
            return this.$store.state.experimentContainer.activated;
        }
    },
})
export class ExperimentContainerComponent extends Vue {
    // experimentContainer size. Fullscreen appearance on true
    private isExpanded: boolean;

    // stores store state experimentContainer activated.
    // basically, experiment interactions are disabled on
    // false
    private isActive: boolean;

    // true, when users does mouseover
    private isMouseover: boolean = false;

    // actual transition of experimentContainer component for
    // route specific component inside router-view=experimentContainer
    // only apply this transition, when route context is "/" (home)
    private transition: boolean = true;

    // actual expanding transition of
    // route specific component inside router-view=experimentContainer
    private expandTransition: boolean = false;

    created() {
        this.$router.beforeEach((to, from, next) => {
            this.transition = from.path === '/' || to.path === '/';
            this.expandTransition =
                from.path === '/' ||
                to.path === '/' ||
                from.path === '/update' ||
                to.path === '/update';
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