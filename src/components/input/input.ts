import Block from 'core/Block';

import './input.scss';

export interface InputProps {
  onInput?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  type?: 'text' | 'password' | 'email' | 'tel';
  name: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export class Input extends Block {
  static componentName = 'Input';

  constructor({ onInput, onBlur, onFocus, type = 'text', ...props }: InputProps) {
    super({
      type,
      ...props,
      events: {
        input: onInput,
        blur: onBlur,
        focus: onFocus
      }
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <input class="form-control"
             type="{{type}}"
             name="{{name}}"
             value="{{value}}"
             placeholder="{{placeholder}}"
             {{#if required}}required{{/if}}
             {{#if disabled}}disabled{{/if}}
      >
    `;
  }
}
