import Block from 'core/Block';

import { ValidateType } from 'helpers/validate/validateType';
import { validateControl } from 'helpers/validate/validateForm';
import { InputType } from '../input';

import './inputWrap.scss';

interface InputWrapProps {
  onInput?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  validateRule: ValidateType,
  type?: InputType;
  name: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export class InputWrap extends Block<InputWrapProps> {
  static componentName = 'InputWrap';

  constructor({ ...props }: InputWrapProps) {
    super({
      ...props,
      onInput: (e: FocusEvent) => {
        this.validate(e);
      },
      onBlur: (e: FocusEvent) => {
        this.validate(e);
      },
      onFocus: (e: FocusEvent) => {
        this.validate(e, false);
      }
    });
  }

  validate(e: FocusEvent, checkEmpty = true) {
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
          <label class="form-label">{{label}}</label>
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
            ref="inputRef"
        }}}
        {{{InputError ref="errorRef" text=error}}}
      </div>
    `;
  }
}
