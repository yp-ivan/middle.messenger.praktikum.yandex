import Block from 'core/Block';

import './profile.scss';

export class ProfilePage extends Block {

  static componentName = 'Профиль';

  render() {
    // language=hbs
    return `
      <div class="fbox">

        {{{Link text="" to="messenger" className="profile__back"}}}

        <main class="profile">

          <div class="profile-data">

            {{{Avatar url="" className="profile-avatar"}}}

            <h2 class="profile-name">Иван</h2>

            <div class="profile-list">
              {{{ProfileDataItem title="Почта" value="pochta@yandex.ru"}}}
              {{{ProfileDataItem title="Логин" value="ivanivanov"}}}
              {{{ProfileDataItem title="Имя" value="Иван"}}}
              {{{ProfileDataItem title="Фамилия" value="Иванов"}}}
              {{{ProfileDataItem title="Имя в чате" value="Иван"}}}
              {{{ProfileDataItem title="Телефон" value="+7 (909) 967 30 30"}}}
            </div>

            <ul class="profile-links">
              <li>{{{Link text="Изменить данные" to="settings-edit"}}}</li>
              <li>{{{Link text="Изменить пароль" to="settings-password"}}}</li>
              <li>{{{Link text="Выйти" to="" className="color-red"}}}</li>
            </ul>

          </div>

        </main>

      </div>
    `;
  }
}
