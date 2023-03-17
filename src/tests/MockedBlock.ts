import { Block } from 'core/index';

export type MockedBlockProps = {
  user: string;
  age: number;
};

export class MockedBlock extends Block<MockedBlockProps> {
  _render() {
    const fragment = this._compile();
    const newElement = fragment.firstElementChild!;
    if (this._element) {
      this._element.replaceWith(newElement);
    }
    this._removeEvents();
    this._element = fragment as unknown as HTMLElement;
    this._addEvents();
  }

  render() {
    return `${this.props.user} - ${this.props.age}`;
  }

  _compile(): DocumentFragment {
    const fragment = document.createElement('template');
    fragment.innerHTML = `<div>${this.render()}</div>`;
    return fragment.content;
  }

  _checkInDom(inDom = true) {
    if (inDom) return;
    this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
  }

  getContent(): HTMLElement {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    return this.element!;
  }
}
