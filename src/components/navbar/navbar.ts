import { Component, Vue, Watch } from 'vue-property-decorator';
import { Logger } from '../../util/log';
import { RouterLink } from './../router/';

@Component({
    template: require('./navbar.html'),
})
export class NavbarComponent extends Vue {

    private isHome: Boolean = false;

    links: RouterLink[] = [
        new RouterLink('Home', '/'),
    ];

    @Watch('$route.path')
    pathChanged() {
        this.isHome = this.$route.path === '/';
    }

    created() {
        this.isHome = this.$route.path === '/';
    }

    goHome() {
        this.$router.push('/');
    }
}