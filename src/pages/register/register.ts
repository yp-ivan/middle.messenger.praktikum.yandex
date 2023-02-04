import Block from 'core/Block';

export class RegisterPage extends Block {
  render() {
    // language=hbs
    return `
      {{#Modal title="Регистрация"}}
        <form>

          {{{InputWrap
              name="email"
              label="Почта"
              type="email"
              required=true}}}
          {{{InputWrap
              name="login"
              label="Логин"
              type="text"
              required=true}}}
          {{{InputWrap
              name="first_name"
              label="Имя"
              type="text"
              required=true}}}
          {{{InputWrap
              name="second_name"
              label="Фамилия"
              type="text"
              required=true}}}
          {{{InputWrap
              name="phone"
              label="Телефон"
              type="tel"
              required=true}}}
          {{{InputWrap
              name="password"
              label="Пароль"
              type="password"
              required=true}}}
          {{{InputWrap
              name="password"
              label="Пароль (ещё раз)"
              type="password-confirm"
              required=true}}}

          <div class="form-group form-group_btns">
            {{{Button className="btn_primary w-100" type="submit" text="Зарегистрироваться"}}}
          </div>
          <div class="form-group text-center">
            {{{Link text="Войти" to="/login"}}}
          </div>
        </form>
      {{/Modal}}
    `;
  }
}
