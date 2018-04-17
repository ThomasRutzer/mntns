import { Component, Vue } from 'vue-property-decorator';
import RouterLinks from './../router/Router-Link';

@Component({
    template: require('./footerbar.html'),
})
export class FooterbarComponent extends Vue {
    links: RouterLinks[] = [
        new RouterLinks('Kontakt', 'contact'),
        new RouterLinks('mntns', 'experiments'),
    ];
}