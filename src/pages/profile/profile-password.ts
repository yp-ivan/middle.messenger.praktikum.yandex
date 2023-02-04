import Block from 'core/Block';

import './profile.scss';

export class ProfilePasswordPage extends Block {
  render() {
    // language=hbs
    return `
      <div class="fbox">

        {{{Link text="" to="/profile" className="profile__back"}}}

        <main class="profile__div">

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
                }}}
                {{{InputWrap
                    name="newPassword"
                    label="Новый пароль"
                    type="password"
                    value=""
                    required=true
                }}}
                {{{InputWrap
                    name="newPassword2"
                    label="Повторите новый пароль"
                    type="password"
                    value=""
                    required=true
                }}}
              </div>

              <div class="form-group form-group_btns">
                {{{Button className="btn_primary w-100" type="submit" text="Сохранить"}}}
              </div>

            </form>

          </div>

        </main>

      </div>
    `;
  }
}
