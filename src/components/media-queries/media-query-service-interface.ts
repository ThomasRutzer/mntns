export interface MediaQueryServiceInterface {
    getCurrentBreakpoint(): string;
    on(breakpoint: string, callback: Function);
}
