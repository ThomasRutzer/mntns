import { injectable, inject } from 'inversify';
import { types } from './../dependency-injection';
import { MediaQueryServiceInterface } from './media-query-service-interface';
import { BreakpointsInterface } from './breakpoints-interface';

@injectable()
class MediaQueryService implements MediaQueryServiceInterface {
    private breakpoints: BreakpointsInterface;
    private currentBreakpoint: string;

    constructor(
        @inject(types.Breakpoints) breakpoints: BreakpointsInterface
    ) {
        this.breakpoints = breakpoints;

        window.addEventListener('resize', () => this.onResize);
        this.onResize();
    }

    public getCurrentBreakpoint() {
        return this.currentBreakpoint;
    }

    /**
     * other elements can subscribe here with callback function
     * to get notified about any changes. Callback will be initially invoked
     * and with every changes, with argument of @type MediaQueryListEvent
     * @param {string} breakpoint
     * @param {Function} callback
     */
    public on(breakpoint: string, callback: Function) {
        const res = this.checkBreakpoint(breakpoint);
        callback(res);
        res.addListener(callback);
    }

    private onResize() {
        this.currentBreakpoint = this.filterCurrentBreakpoint(this.breakpoints);
    }

    /**
     *
     * @param {BreakpointsInterface} breakpoints
     * @return {string} key of currently matching breakpoint
     */
    private filterCurrentBreakpoint(breakpoints: BreakpointsInterface): string {
        const matching = Object.keys(breakpoints).filter((breakpoint) => {
            return this.checkBreakpoint(breakpoints[breakpoint]).matches;
        });

        return matching[0];
    }

    /**
     * @param {string} breakpoint
     * @return {{matches: boolean; addListener: Function}}
     */
    private checkBreakpoint(breakpoint: string): { matches: boolean, addListener: Function } {
        return window.matchMedia(`(min-width: ${breakpoint}px)`);
    }
}

export default MediaQueryService;