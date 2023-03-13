import { Block } from 'core/index';

import './error.scss';

export class Error extends Block {
  static componentName = 'Error';

  protected render(): string {
    // language=hbs
    return `
      <div class="error">{{#if value}}{{value}}{{/if}}</div>
    `;
  }
}
