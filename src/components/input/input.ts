import Block from 'core/Block';

import './input.scss';

export type InputType = 'text' | 'password' | 'email' | 'tel';

interface InputBaseProps {
  type?: InputType;
  name: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

interface InputProps extends InputBaseProps {
  onInput?: FuncProp;
  onBlur?: FuncProp;
  onFocus?: FuncProp;
}

interface InputSuperProps extends InputBaseProps {
  events: {
    input?: FuncProp;
    blur?: FuncProp;
    focus?: FuncProp;
  }
}

export class Input extends Block<InputProps> {
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
    } as InputSuperProps);
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
