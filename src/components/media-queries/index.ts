/**
 * @see https://stackoverflow.com/questions/32950966/typescript-compiler-error-when-importing-json-file#32952089
 * because currently, Typescript cant import *.json files
 */
const BREAKPOINTS = require('./breakpoints.json');
import { BreakpointsInterface } from './breakpoints-interface';
import { diContainer, types} from './../dependency-injection';
import { MediaQueryServiceInterface } from './media-query-service-interface';
import MediaQueryService from './media-query-service';

diContainer.bind<BreakpointsInterface>(types.Breakpoints).toConstantValue(BREAKPOINTS['mq-breakpoints']);
diContainer.bind<MediaQueryServiceInterface>(types.MediaQueryService).to(MediaQueryService);

export {
    BREAKPOINTS,
    MediaQueryServiceInterface,
};