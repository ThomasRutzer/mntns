export interface DataMapperServiceInterface {
    map(dataSet: {cacheId?: string, data: any[]}, mapper: any[]): Object[]
}
