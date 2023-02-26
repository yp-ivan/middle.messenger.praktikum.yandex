import Block from 'core/Block';
import { getFormValues, validateForm } from 'helpers/validate/validateForm';

import './profile.scss';

export class ProfileEditPage extends Block {

  static componentName = 'Редактирование профиля';

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

        {{{Link text="" to="settings" className="profile__back"}}}

        <main class="profile">

          <div class="profile-data">

            <form>

              <div class="avatar profile-avatar">
                <label for="profile-avatar" class="profile-avatar_edit">Поменять аватар</label>
                <input type="file" name="avatar" id="profile-avatar" class="profile-avatar__input">
              </div>

              <div class="profile-list">

                {{{InputWrap
                    name="email"
                    label="Почта"
                    type="email"
                    value="pochta@yandex.ru"
                    required=true
                    validateRule="email"
                    ref="emailInput"
                }}}
                {{{InputWrap
                    name="login"
                    label="Логин"
                    type="text"
                    value="ivanivanov"
                    required=true
                    validateRule="login"
                    ref="loginInput"
                }}}
                {{{InputWrap
                    name="first_name"
                    label="Имя"
                    type="text"
                    value="Иван"
                    validateRule="firstName"
                    ref="firstNameInput"
                }}}
                {{{InputWrap
                    name="second_name"
                    label="Фамилия"
                    type="text"
                    value="Иванов"
                    validateRule="secondName"
                    ref="secondNameInput"
                }}}
                {{{InputWrap
                    name="display_name"
                    label="Имя в чате"
                    type="text"
                    value="Иван"
                    ref="nickInput"
                }}}
                {{{InputWrap
                    name="phone"
                    label="Телефон"
                    type="tel"
                    value="+7 (909) 967 30 30"
                    validateRule="phone"
                    ref="phoneInput"
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
