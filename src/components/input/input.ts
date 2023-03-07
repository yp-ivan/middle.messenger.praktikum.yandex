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
  onInput?: (e: Event) => void;
  onBlur?: (e: Event) => void;
  onFocus?: (e: Event) => void;
  onChange?: (e: Event) => void;
}

interface InputSuperProps extends InputBaseProps {
  events: {
    input?: (e: Event) => void;
    blur?: (e: Event) => void;
    focus?: (e: Event) => void;
    change?: (e: Event) => void;
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
      this.setProps({ id: nanoid(6) });
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
