import Block from 'core/Block';

import './inputError.scss';

type InputErrorProps = {
  text?: string;
};

export class InputError extends Block<InputErrorProps> {
  static componentName = 'InputError';

  protected render(): string {
    // language=hbs
    return `<div class="form-error">{{#if text}}{{text}}{{/if}}</div>`;
  }
}
