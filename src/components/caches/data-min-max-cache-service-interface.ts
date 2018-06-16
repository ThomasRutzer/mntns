export interface DataMinMaxCacheServiceInterface {
    cacheProperty(dataSetId: string, property: string, minMaxValues: {min:any,max:any});
    clearEntireCache();
    clearCache(dataSetId: string);
    getCachedProperty(dataSetId: string, property: string): {min: number, max: number}|null;
}
