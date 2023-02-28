import { Block, CoreRouter, Store } from 'core';
import { getFormValues, validateForm } from 'helpers/validate/validateForm';
import { withRouter, withStore } from 'helpers';
import { register } from 'services/auth';
import { RegisterRequestData } from 'api/auth';

type RegisterPageProps = {
  router: CoreRouter;
  store: Store<AppState>;
  onRegister: (e: Event) => void;
  formError?: () => string | null;
};

export class RegisterPage extends Block<RegisterPageProps> {

  static componentName = 'Регистрация';

  constructor(props: RegisterPageProps) {
    super(props);
    this.setProps({
      formError: () => this.props.store.getState().formErrors?.register || '',
      onRegister: (e: Event) => {
        e.preventDefault();
        const isValid = validateForm(this.refs);
        const values = getFormValues(this.refs);

        if (isValid) {
          const registerData: RegisterRequestData = {
            email: values.find(item => item.name === 'email')?.value,
            login: values.find(item => item.name === 'login')?.value,
            first_name: values.find(item => item.name === 'first_name')?.value,
            second_name: values.find(item => item.name === 'second_name')?.value,
            phone: values.find(item => item.name === 'phone')?.value,
            password: values.find(item => item.name === 'password')?.value
          };

          const nextState = {
            values: registerData,
          };

          this.setState(nextState);

          this.props.store.dispatch(register, registerData);
        }
      }
    });
  }

  protected getStateFromProps() {
    this.state = {
      values: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
      }
    };
  }

  render() {
    const { values } = this.state;

    // language=hbs
    return `
      {{#Modal title="Регистрация"}}
        {{{Error value=formError}}}
        <form>
          {{{InputWrap
              name="email"
              label="Почта"
              value="${values.email}"
              type="email"
              required=true
              validateRule="email"
              ref="emailInput"
          }}}
          {{{InputWrap
              name="login"
              label="Логин"
              value="${values.login}"
              type="text"
              required=true
              validateRule="login"
              ref="loginInput"
          }}}
          {{{InputWrap
              name="first_name"
              label="Имя"
              value="${values.first_name}"
              type="text"
              required=true
              validateRule="firstName"
              ref="firstNameInput"
          }}}
          {{{InputWrap
              name="second_name"
              label="Фамилия"
              value="${values.second_name}"
              type="text"
              required=true
              validateRule="secondName"
              ref="secondNameInput"
          }}}
          {{{InputWrap
              name="phone"
              label="Телефон"
              value="${values.phone}"
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
                onClick=onRegister
            }}}
          </div>
          <div class="form-group text-center">
            {{{Link text="Войти" to=""}}}
          </div>
        </form>
      {{/Modal}}
    `;
  }
}

export default withRouter(withStore(RegisterPage));
