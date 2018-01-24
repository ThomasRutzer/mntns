import { Component, Vue, Watch } from 'vue-property-decorator';
import { Logger } from '../../util/log';
import { RouterLink } from './../router/';

@Component({
    template: require('./navbar.html'),
})
export class NavbarComponent extends Vue {

    protected logger: Logger;
    private isHome: Boolean = false;

    object: { default: string } = { default: 'Default object property!' }; // objects as default values don't need to be wrapped into functions

    links: RouterLink[] = [
        new RouterLink('Home', '/'),
    ];

    @Watch('$route.path')
    pathChanged() {
        this.isHome = this.$route.path == '/';
    }

    mounted() {
        if (!this.logger) this.logger = new Logger();
        this.$nextTick(() => this.logger.info(this.object.default));
    }

    goHome() {
        this.$router.push('/');
    }
}