import { Component, Vue } from 'vue-property-decorator';
import { RouterLink } from './../router/';

@Component({
    template: require('./footerbar.html'),
})
export class FooterbarComponent extends Vue {
    links: RouterLink[] = [
        new RouterLink('Kontakt', '/contact'),
    ];
}