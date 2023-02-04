import Block from 'core/Block';
import { getFormValues, validateForm } from 'helpers/validate/validateForm';

import './profile.scss';

export class ProfilePasswordPage extends Block {
  constructor() {
    super();
    this.setProps({
      onSubmit: (e: FocusEvent) => {
        e.preventDefault();
        validateForm(this.refs);
        getFormValues(this.refs, true);
      }
    });
  }

  render() {
    // language=hbs
    return `
      <div class="fbox">

        {{{Link text="" to="/profile" className="profile__back"}}}

        <main class="profile">

          <div class="profile-data">

            <form>

              {{{Avatar url="" className="profile-avatar"}}}

              <div class="profile-list">
                {{{InputWrap
                    name="oldPassword"
                    label="Старый пароль"
                    type="password"
                    value=""
                    required=true
                    validateRule="password"
                    ref="oldPasswordInput"
                }}}
                {{{InputWrap
                    name="newPassword"
                    label="Новый пароль"
                    type="password"
                    value=""
                    required=true
                    validateRule="password"
                    ref="newPasswordInput"
                }}}
                {{{InputWrap
                    name="newPasswordConfirm"
                    label="Повторите новый пароль"
                    type="password"
                    value=""
                    required=true
                    validateRule="password"
                    ref="newPasswordConfirmInput"
                }}}
              </div>

              <div class="form-group form-group_btns">
                {{{Button
                    className="btn_primary w-100"
                    type="submit"
                    text="Сохранить"
                    onClick=onSubmit
                }}}
              </div>

            </form>

          </div>

        </main>

      </div>
    `;
  }
}
