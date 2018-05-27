import LevelModelInterface from './level-model-interface';

export default class LevelModel implements LevelModelInterface {
    public index: number;
    public title: string;
    public progress: number;

    constructor(index, title, progress) {
        this.index = index;
        this.title = title;
        this.progress = progress;
    }
}
