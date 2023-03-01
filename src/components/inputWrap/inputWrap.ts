import Block from 'core/Block';

import { ValidateType } from 'helpers/validate/validateType';
import { validateControl } from 'helpers/validate/validateForm';
import { InputType } from 'components/input';
import { nanoid } from 'nanoid';

import './inputWrap.scss';

interface InputWrapProps {
  onInput?: (e: Event) => void;
  onBlur?: (e: Event) => void;
  onFocus?: (e: Event) => void;
  validateRule: ValidateType,
  type?: InputType;
  name: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
}

export class InputWrap extends Block<InputWrapProps> {
  static componentName = 'InputWrap';

  constructor({ ...props }: InputWrapProps) {
    super({
      ...props,
      onInput: (e: Event) => {
        this.validate(e);
      },
      onBlur: (e: Event) => {
        this.validate(e);
      },
      onFocus: (e: Event) => {
        this.validate(e, false);
      }
    });
    if (this.props.id === undefined) {
      this.props.id = nanoid(6);
    }
  }

  validate(e: Event, checkEmpty = true) {
    const { value } = e.target as HTMLInputElement;
    if (!value && !checkEmpty) return;
    const rule = this.props.validateRule;
    if (rule === undefined) return;
    const error = validateControl([{ rule, value }]);
    this.refs.errorRef.setProps({
      text: error,
      submitted: false
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="form-group">
        {{#if label}}
          <label class="form-label" for="{{id}}">{{label}}</label>
        {{/if}}
        {{{Input
            id=id
            type=type
            name=name
            value=value
            placeholder=placeholder
            required=required
            disabled=disabled
            onInput=onInput
            onFocus=onFocus
            onBlur=onBlur
            onChange=onChange
            ref="inputRef"
        }}}
        {{{InputError ref="errorRef" text=error}}}
      </div>
    `;
  }
}
