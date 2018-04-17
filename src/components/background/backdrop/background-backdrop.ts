import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import { types, diContainer } from './../../dependency-injection';
import {BREAKPOINTS, MediaQueryServiceInterface} from '../../media-queries';

@Component({
    template: require('./background-backdrop.html'),
})
export class BackgroundBackdropComponent extends Vue {
    private mousemoveActivated: boolean;
    private mediaQueryService: MediaQueryServiceInterface;

    @Prop()
    activated: boolean;

    @Prop()
    triggerLabel: string;

    created() {
        const breakpoints = diContainer.get(types.Breakpoints);
        this.mediaQueryService = diContainer.get<MediaQueryServiceInterface>(types.MediaQueryService);
        this.mediaQueryService.on(breakpoints['m'], (mqEvent: MediaQueryList) => {
            this.mousemoveActivated = mqEvent.matches;
        });
    }
}

