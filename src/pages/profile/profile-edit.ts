import Block from 'core/Block';

import './profile.scss';

export class ProfileEditPage extends Block {
  render() {
    console.log(this.refs);
    // language=hbs
    return `
      <div class="fbox">

        {{{Link text="" to="/profile" className="profile__back"}}}

        <main class="profile__div">

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
                }}}
                {{{InputWrap
                    name="login"
                    label="Логин"
                    type="text"
                    value="ivanivanov"
                    required=true
                }}}
                {{{InputWrap
                    name="first_name"
                    label="Имя"
                    type="text"
                    value="Иван"
                }}}
                {{{InputWrap
                    name="second_name"
                    label="Фамилия"
                    type="text"
                    value="Иванов"
                }}}
                {{{InputWrap
                    name="nick"
                    label="Имя в чате"
                    type="text"
                    value="Иван"
                }}}
                {{{InputWrap
                    name="+7 (909) 967 30 30"
                    label="Телефон"
                    type="tel"
                    value="Иванов"
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
