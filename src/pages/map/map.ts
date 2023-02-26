import { Block } from 'core';

import './map.scss';

export class MapPage extends Block {

  static componentName = 'Карта сайта';
  constructor() {
    super();
  }

  render() {
    // language=hbs
    return `
      {{#Modal title="Карта сайта" }}
        <nav class="nav-pages">
            <ul class="nav-pages__list">
                <li>{{{Link text="Авторизация" to=""}}}</li>
                <li>{{{Link text="Регистрация" to="sign-up"}}}</li>
            </ul>
            <ul class="nav-pages__list">
                <li>{{{Link text="Чат" to="messenger"}}}</li>
                <li>{{{Link text="Профиль пользователя" to="settings"}}}</li>
                <li>{{{Link text="Редактирование профиля" to="settings-edit"}}}</li>
                <li>{{{Link text="Изменение пароля" to="settings-password-edit"}}}</li>
            </ul>
            <ul class="nav-pages__list">
                <li>{{{Link text="Ошибка 404" to="error-404"}}}</li>
                <li>{{{Link text="Ошибка 500" to="error-500"}}}</li>
            </ul>
        </nav>
      {{/Modal}}
    `;
  }
}
