import Block from 'core/Block';
import { nanoid } from 'nanoid';

import './input.scss';

export type InputType = 'text' | 'password' | 'email' | 'tel' | 'file';

interface InputBaseProps {
  type?: InputType;
  name: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
}

interface InputProps extends InputBaseProps {
  onInput?: FuncProp;
  onBlur?: FuncProp;
  onFocus?: FuncProp;
  onChange?: FuncProp;
}

interface InputSuperProps extends InputBaseProps {
  events: {
    input?: FuncProp;
    blur?: FuncProp;
    focus?: FuncProp;
    change?: FuncProp;
  }
}

export class Input extends Block<InputProps> {
  static componentName = 'Input';

  constructor({ onInput, onBlur, onFocus, onChange, type = 'text', ...props }: InputProps) {
    super({
      type,
      ...props,
      events: {
        input: onInput,
        blur: onBlur,
        focus: onFocus,
        change: onChange
      }
    } as InputSuperProps);
    if (this.props.id === undefined) {
      this.props.id = nanoid(6);
    }
  }

  protected render(): string {
    // language=hbs
    return `
      <input class="form-control"
             id="{{id}}"
             type="{{type}}"
             name="{{name}}"
             {{#if value}}value="{{value}}"{{/if}}
             {{#if placeholder}}placeholder="{{placeholder}}"{{/if}}
             {{#if required}}required{{/if}}
             {{#if disabled}}disabled{{/if}}
      >
    `;
  }
}
