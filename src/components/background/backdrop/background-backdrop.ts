import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

@Component({
    template: require('./background-backdrop.html'),
})
export class BackgroundBackdropComponent extends Vue {

    @Prop()
    activated: boolean;

    @Prop()
    triggerLabel: string;
}

