import { renderDOM } from 'core';
import Block from 'core/Block';

import './home.scss';

import LoginPage from 'pages/login';
import RegisterPage from 'pages/register';
import Error404Page from 'pages/error404';
import Error500Page from 'pages/error500';
import ProfilePage, { ProfileEditPage, ProfilePasswordPage } from 'pages/profile';
import ChatPage from 'pages/chat';

export class HomePage extends Block {
  constructor() {
    super();
    this.setProps({
      openLoginPage: (e: FocusEvent) => {
        e.preventDefault();
        renderDOM(new LoginPage());
      },
      openRegisterPage: (e: FocusEvent) => {
        e.preventDefault();
        renderDOM(new RegisterPage());
      },
      openError404Page: (e: FocusEvent) => {
        e.preventDefault();
        renderDOM(new Error404Page());
      },
      openError500Page: (e: FocusEvent) => {
        e.preventDefault();
        renderDOM(new Error500Page());
      },
      openProfilePage: (e: FocusEvent) => {
        e.preventDefault();
        renderDOM(new ProfilePage());
      },
      openProfileEditPage: (e: FocusEvent) => {
        e.preventDefault();
        renderDOM(new ProfileEditPage());
      },
      openProfileEditPassPage: (e: FocusEvent) => {
        e.preventDefault();
        renderDOM(new ProfilePasswordPage());
      },
      openChatPage: (e: FocusEvent) => {
        e.preventDefault();
        renderDOM(new ChatPage());
      }
    });
  }

  render() {
    // language=hbs
    return `
      {{#Modal title="Навигация по страницам" }}
        <nav class="nav-pages">
            <ul class="nav-pages__list">
                <li>{{{Button text="Авторизация" className="btn_primary w-100" link="/login" onClick=openLoginPage}}}</li>
                <li>{{{Button text="Регистрация" className="btn_primary w-100" link="/register" onClick=openRegisterPage}}}</li>
            </ul>
            <ul class="nav-pages__list">
                <li>{{{Button text="Чат" className="btn_primary w-100" link="/chat" onClick=openChatPage}}}</li>
                <li>{{{Button text="Профиль пользователя" className="btn_primary w-100" link="/profile" onClick=openProfilePage}}}</li>
                <li>{{{Button text="Редактирование профиля" className="btn_primary w-100" link="/profile" onClick=openProfileEditPage}}}</li>
                <li>{{{Button text="Изменение профиля" className="btn_primary w-100" link="/profile" onClick=openProfileEditPassPage}}}</li>
            </ul>
            <ul class="nav-pages__list">
                <li>{{{Button text="Ошибка 404" className="btn_primary w-100" link="/error404" onClick=openError404Page}}}</li>
                <li>{{{Button text="Ошибка 500" className="btn_primary w-100" link="/error500" onClick=openError500Page}}}</li>
            </ul>
        </nav>
      {{/Modal}}
    `;
  }
}
