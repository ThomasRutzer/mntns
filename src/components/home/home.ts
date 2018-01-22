import { Component, Vue } from 'vue-property-decorator';

import './home.scss';

@Component({
    template: require('./home.html')
})
export class HomeComponent extends Vue {

}