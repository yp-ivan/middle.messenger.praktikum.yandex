import Block from 'core/Block';
import { v4 as uuidv4 } from 'uuid';

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

  constructor({ onInput, onBlur, onFocus, onChange, type = 'text', id, ...props }: InputProps) {
    super({
      type,
      id: (id !== undefined) ? id : uuidv4(),
      ...props,
      events: {
        input: onInput,
        blur: onBlur,
        focus: onFocus,
        change: onChange
      }
    } as InputSuperProps);
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
