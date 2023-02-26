import Block from 'core/Block';
import { getFormValues, validateForm } from 'helpers/validate/validateForm';

export class LoginPage extends Block {
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
      {{#Modal title="Вход" }}
        <form>
          {{{InputWrap
              name="login"
              label="Логин"
              type="text"
              required=true
              validateRule="login"
              ref="loginInput"
          }}}
          {{{InputWrap
              name="password"
              label="Пароль"
              type="password"
              required=true
              validateRule="password"
              ref="passwordInput"
          }}}
          <div class="form-group form-group_btns">
            {{{Button
                text="Войти"
                type="submit"
                className="btn_primary w-100"
                onClick=onSubmit
            }}}
          </div>
          <div class="form-group text-center">
            {{{Link text="Нет аккаунта?" to="sign-up"}}}
          </div>
        </form>
      {{/Modal}}
    `;
  }
}
