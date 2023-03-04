import { Block, CoreRouter, Store } from 'core';
import { getFormKeyValues, getFormValues, validateForm } from 'helpers/validate/validateForm';
import { withRouter, withStore } from 'helpers';
import { login } from 'services/auth';
import { LoginRequestData } from 'api/auth';

type LoginPageProps = {
  router: CoreRouter;
  store: Store<AppState>;
  onLogin: (e: Event) => void;
  formError?: () => string | null;
};

export class LoginPage extends Block<LoginPageProps> {

  static componentName = 'Вход';

  constructor(props: LoginPageProps) {
    super(props);
    this.setProps({
      formError: () => this.props.store.getState().formErrors?.login || '',
      onLogin: (e: Event) => {
        e.preventDefault();
        const isValid = validateForm(this.refs);
        const values = getFormKeyValues(getFormValues(this.refs));

        if (isValid) {
          const loginData: LoginRequestData = {
            login: values.login || '',
            password: values.password || ''
          };
          const nextState = {
            values: loginData,
          };
          this.setState(nextState);
          this.props.store.dispatch(login, loginData);
        }

      }
    });
  }

  protected getStateFromProps() {
    this.state = {
      values: {
        login: '',
        password: '',
      }
    };
  }

  render() {
    const { values } = this.state;

    // language=hbs
    return `
      {{#Modal title="Вход" }}
        {{{Error value=formError}}}
        <form>
          {{{InputWrap
              name="login"
              label="Логин"
              value="${values.login}"
              type="text"
              required=true
              validateRule="notEmpty"
              ref="loginInput"
          }}}
          {{{InputWrap
              name="password"
              label="Пароль"
              type="password"
              required=true
              validateRule="notEmpty"
              ref="passwordInput"
          }}}
          <div class="form-group form-group_btns">
            {{{Button
                text="Войти"
                type="submit"
                className="btn_primary w-100"
                onClick=onLogin
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

export default withRouter(withStore(LoginPage));
