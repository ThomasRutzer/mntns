import LevelModelInterface from "./level-model-interface";

export default class LevelModel implements LevelModelInterface {
    public index: number;
    public title: string;

    constructor(index, title) {
        this.index = index;
        this.title = title;
    }
}
