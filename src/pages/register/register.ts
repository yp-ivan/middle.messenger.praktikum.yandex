import Block from 'core/Block';
import { getFormValues, validateForm } from 'helpers/validate/validateForm';

export class RegisterPage extends Block {
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
      {{#Modal title="Регистрация"}}
        <form>
          {{{InputWrap
              name="email"
              label="Почта"
              type="email"
              required=true
              validateRule="email"
              ref="emailInput"
          }}}
          {{{InputWrap
              name="login"
              label="Логин"
              type="text"
              required=true
              validateRule="login"
              ref="loginInput"
          }}}
          {{{InputWrap
              name="first_name"
              label="Имя"
              type="text"
              required=true
              validateRule="firstName"
              ref="firstNameInput"
          }}}
          {{{InputWrap
              name="second_name"
              label="Фамилия"
              type="text"
              required=true
              validateRule="secondName"
              ref="secondNameInput"
          }}}
          {{{InputWrap
              name="phone"
              label="Телефон"
              type="tel"
              required=true
              validateRule="phone"
              ref="phoneInput"
          }}}
          {{{InputWrap
              name="password"
              label="Пароль"
              type="password"
              required=true
              validateRule="password"
              ref="passwordInput"
          }}}
          {{{InputWrap
              name="password_confirm"
              label="Пароль (ещё раз)"
              type="password"
              required=true
              validateRule="password"
              ref="passwordConfirmInput"
          }}}
          <div class="form-group form-group_btns">
            {{{Button
                className="btn_primary w-100"
                type="submit"
                text="Зарегистрироваться"
                onClick=onSubmit
            }}}
          </div>
          <div class="form-group text-center">
            {{{Link text="Войти" to="/login"}}}
          </div>
        </form>
      {{/Modal}}
    `;
  }
}
