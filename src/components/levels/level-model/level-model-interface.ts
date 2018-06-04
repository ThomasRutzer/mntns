interface LevelModelInterface {
    index: number,
    title: string,

    /**
    * overall progress when this levels
    * is active (in percentage)
    */
    progress: number,

    /**
     * defines which date set
     * shall be loaded, when this
     * level is current one. Possible
     * types are defined in level-data-sources.ts
     */
    dataSrc: string

}

export default LevelModelInterface;
