import { Component, Prop, Vue } from 'vue-property-decorator';
import { types, diContainer } from './../dependency-injection';
import { MediaQueryServiceInterface} from '../media-queries';

@Component({
    template: require('./backdrop.html'),
})
export class BackdropComponent extends Vue {
    private mousemoveActivated: number = 1;
    private mediaQueryService: MediaQueryServiceInterface;

    // currently activates / deactivates
    // mousemove following
    @Prop()
    activated: boolean;

    // displays a label
    // on backdrop
    @Prop()
    triggerLabel: string;

    mounted() {
        const breakpoints = diContainer.get(types.Breakpoints);
        this.mediaQueryService = diContainer.get<MediaQueryServiceInterface>(types.MediaQueryService);
        this.mediaQueryService.on(breakpoints['m'], (mqEvent: MediaQueryList) => {
            this.mousemoveActivated = mqEvent.matches ? 1 : 2;
        });
    }
}

