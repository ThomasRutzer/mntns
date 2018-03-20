import { Component } from 'vue-property-decorator';
import { RouterDefaultComponentAbstract } from './../router';

@Component({
    template: require('./contact.html'),
})
export class ContactComponent extends RouterDefaultComponentAbstract {

}