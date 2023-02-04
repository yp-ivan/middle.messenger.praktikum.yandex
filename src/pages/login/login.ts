import Block from 'core/Block';

export class LoginPage extends Block {
  render() {
    // console.log(this.refs.loginInput.props);
    // language=hbs
    return `
      {{#Modal title="Вход" }}
        <form>
          {{{InputWrap
              name="login"
              label="Логин"
              type="text"
              required=true
              ref="loginInput"}}}
          {{{InputWrap
              name="password"
              label="Пароль"
              type="password"
              required=true
              ref="passwordInput"}}}
          <div class="form-group form-group_btns">
            {{{Button
                text="Войти"
                type="submit"
                className="btn_primary w-100"}}}
          </div>
          <div class="form-group text-center">
            {{{Link text="Нет аккаунта?" to="/register"}}}
          </div>
        </form>
      {{/Modal}}
    `;
  }
}
