import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({})
export class IconButtonComponent extends Vue {
  @Prop({default: 'button'})
  htmlTag: string;

  @Prop({default: 'close'})
  type: string;

  render(createElement) {
    let icon;

    switch (this.type) {
      case 'close':
        icon = '×';
        break;
    }

    return createElement(
      `${this.htmlTag}`,
      {
        class: ['icon-button'],
        domProps: {
          innerHTML: icon
        }
      }
    );
  }
}
