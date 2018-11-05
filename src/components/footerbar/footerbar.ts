import { Component, Vue } from 'vue-property-decorator';
import RouterLinks from './../router/Router-Link';

@Component({
    template: require('./footerbar.html'),
    computed: {
        isVisible() {
            return this.$store.state.currentRoute.footerVisible;
        }
    }
})

export class FooterbarComponent extends Vue {
    links: RouterLinks[] = [
        new RouterLinks('info', 'info'),
    ];
}
