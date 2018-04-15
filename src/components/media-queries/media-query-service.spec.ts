import {stub} from 'sinon';
import {expect} from 'chai';
import MediaQueryService from './media-query-service';
import {MediaQueryServiceInterface} from "./media-query-service-interface";
import {BreakpointsInterface} from "./breakpoints-interface";

describe('Media Query Service', () => {
    let service: MediaQueryServiceInterface = null, matchMediaStub, windowStubWidth;
    const breakpoints: BreakpointsInterface = {
        's': '480px',
        'm': '768px',
        'l': '1024px',
        'xl': '1440px'
    };

    before(() => {
        windowStubWidth = stub(window, 'innerWidth').value(1000);
        matchMediaStub = stub(window, 'matchMedia').callsFake((mediaQuery) => {
            return {
                matches: mediaQuery.match(/\d+/g).map(Number)[0] > window.innerWidth,
                addListener: (callback => {
                    callback(mediaQuery.match(/\d+/g).map(Number)[0] > window.innerWidth);
                })
            }
        });

        service = new MediaQueryService(breakpoints);
    });

    after(() => {
        windowStubWidth.restore();
        matchMediaStub.restore();
    });

    it('holds current matching breakpoint', () => {
        expect(service.getCurrentBreakpoint()).to.equal('l');
    });

    it('provides a method, where others can get notifications about changing matching breakpoints', () => {
        let matching = null;
        const callback = (matches) => {
            matching = matches;
        };

        service.on(breakpoints['l'], callback);

        expect(matching).to.equal(true);
    });
});