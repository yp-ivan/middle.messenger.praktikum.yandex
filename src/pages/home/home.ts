import { renderDOM } from 'core';
import Block from 'core/Block';

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
        {{{Button text="Авторизация" className="btn_primary w-100" link="/login" onClick=openLoginPage}}}
        <br><br>
        {{{Button text="Регистрация" className="btn_primary w-100" link="/register" onClick=openRegisterPage}}}
        <br><br><hr><br>
        {{{Button text="Чат" className="btn_primary w-100" link="/chat" onClick=openChatPage}}}
        <br><br><hr><br>
        {{{Button text="Профиль пользователя" className="btn_primary w-100" link="/profile" onClick=openProfilePage}}}
        <br><br>
        {{{Button text="Редактирование профиля" className="btn_primary w-100" link="/profile" onClick=openProfileEditPage}}}
        <br><br>
        {{{Button text="Изменение профиля" className="btn_primary w-100" link="/profile" onClick=openProfileEditPassPage}}}
        <br><br><hr><br>
        {{{Button text="Ошибка 404" className="btn_primary w-100" link="/error404" onClick=openError404Page}}}
        <br><br>
        {{{Button text="Ошибка 500" className="btn_primary w-100" link="/error500" onClick=openError500Page}}}
      {{/Modal}}
    `;
  }
}
