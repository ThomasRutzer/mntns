import { Component } from 'vue-property-decorator';
import { RouterDefaultComponentAbstract } from './../router';

@Component({
    template: require('./info.html'),
})
export class InfoComponent extends RouterDefaultComponentAbstract {

}
