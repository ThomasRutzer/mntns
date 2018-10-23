import LegendItemModelInteface from './legend-item-model-interface';

export default class LegendItemModel implements LegendItemModelInteface {
    public label: string;
    public value: string;

    constructor(label, value) {
        this.label = label;
        this.value = value;
    }
}
