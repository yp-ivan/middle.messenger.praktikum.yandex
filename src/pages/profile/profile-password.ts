import { Block, CoreRouter, Store } from 'core';
import { withRouter, withStore } from 'helpers';
import { getFormKeyValues, getFormValues, validateForm } from 'helpers/validate/validateForm';
import { UpdatePasswordRequestData } from 'api/user';
import { updatePassword } from 'services/user';

import './profile.scss';

type ProfilePasswordPageProps = {
  router: CoreRouter;
  store: Store<AppState>;
  onSubmit: (e: Event) => void;
  formError: () => string;
};

export class ProfilePasswordPage extends Block<ProfilePasswordPageProps> {

  static componentName = 'Изменение пароля';

  constructor(props: ProfilePasswordPageProps) {
    super(props);
    this.setProps({
      formError: () => this.state.formError || this.props.store.getState().formErrors?.updatePassword || '',
      onSubmit: (e: Event) => {
        e.preventDefault();
        const values = getFormKeyValues(getFormValues(this.refs));
        const isValid = validateForm(this.refs);

        if (isValid && this.validateFormPassword(values)) {
          const updatePasswordData: UpdatePasswordRequestData = {
            oldPassword: values.oldPassword || '',
            newPassword: values.newPassword || ''
          };

          const nextState = {
            values: updatePasswordData,
          };

          this.setState(nextState);

          this.props.store.dispatch(updatePassword, updatePasswordData);
        }
      }
    });
  }

  private validateFormPassword(values: Indexed): boolean {
    const formErrors: string[] = [];
    if (values.oldPassword === values.newPassword) {
      formErrors.push('Старый и новый пароль не должны совпадать.');
    }
    if (values.newPassword !== values.newPasswordConfirm) {
      formErrors.push('"Новый пароль" и "Повторите новый пароль" не совпадают.');
    }
    this.setState({ formError: formErrors.join(' ') });
    return !formErrors.length;
  }

  protected getStateFromProps() {
    this.state = {
      values: {},
      formError: ''
    };
  }

  render() {
    const user = this.props.store.getState().user;

    // language=hbs
    return `
      <div class="fbox">

        {{{Link text="" to="settings" className="profile__back"}}}

        <main class="profile">

          <div class="profile-data">

            <form>

              <div class="profile-avatar">
                {{{Avatar url="${user?.avatar}"}}}
              </div>

              {{{Error value=formError}}}

              <div class="profile-list">
                {{{InputWrap
                    name="oldPassword"
                    label="Старый пароль"
                    type="password"
                    value=""
                    required=true
                    validateRule="password"
                    ref="oldPasswordInput"
                }}}
                {{{InputWrap
                    name="newPassword"
                    label="Новый пароль"
                    type="password"
                    value=""
                    required=true
                    validateRule="password"
                    ref="newPasswordInput"
                }}}
                {{{InputWrap
                    name="newPasswordConfirm"
                    label="Повторите новый пароль"
                    type="password"
                    value=""
                    required=true
                    validateRule="password"
                    ref="newPasswordConfirmInput"
                }}}
              </div>

              <div class="form-group form-group_btns">
                {{{Button
                    className="btn_primary w-100"
                    type="submit"
                    text="Сохранить"
                    onClick=onSubmit
                }}}
              </div>

            </form>

          </div>

        </main>

      </div>
    `;
  }
}

export default withRouter(withStore(ProfilePasswordPage));
