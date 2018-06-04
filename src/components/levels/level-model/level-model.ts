import LevelModelInterface from './level-model-interface';

export default class LevelModel implements LevelModelInterface {
    public index: number;
    public title: string;
    public progress: number;
    public dataSrc: string;

    constructor(index, title, dataSrc, progress) {
        this.index = index;
        this.title = title;
        this.dataSrc = dataSrc;
        this.progress = progress;
    }
}
