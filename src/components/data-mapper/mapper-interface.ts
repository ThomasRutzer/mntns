/**
 * interface for a Mapper Model
 */
export interface MapperInterface {
    /**
     * key in given data. can be nested, where
     * object {
     *      item {
     *          id
     *      }
     * }
     * would match dataKey: ['item', 'id']
     */
    dataKey: string[],

    /**
     * parameter of Mountain (of mnts project) dataKey shall
     * fill
     */
    mountainsParameter: string,

    /**
     * min / max number of dataKey value. If value
     * is below or above, it´ll be transformed into this range
     */
    min: number,
    max: number,

    /**
     * {string=number, date, string}type of mapper
     */
    type: string,
}
