import Block from 'core/Block';

import './inputWrap.scss';

interface InputWrapProps {
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

export class InputWrap extends Block {
  static componentName = 'InputWrap';

  constructor({ onInput, onBlur, onFocus, type = 'text', ...props }: InputWrapProps) {
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
      <div class="form-group">
        {{#if label}}
          <label for="" class="form-label">{{label}}</label>
        {{/if}}
        {{{Input
            type=type
            name=name
            value=value
            placeholder=placeholder
            required=required
            disabled=disabled
            onInput=onInput
            onFocus=onFocus
            onBlur=onBlur
        }}}
        {{{InputError text=error}}}
      </div>
    `;
  }
}
