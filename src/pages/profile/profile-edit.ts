import { Block, CoreRouter, Store } from 'core';
import { withUser, withRouter, withStore } from 'helpers';
import { getFormKeyValues, getFormValues, validateForm } from 'helpers/validate/validateForm';
import { UpdateProfileRequestData } from 'api/user';
import { update, updateAvatar } from 'services/user';

import './profile.scss';

type ProfileEditPageProps = {
  router: CoreRouter;
  store: Store<AppState>;
  user: User;
  onUpdate: (e: Event) => void;
  onUpdateAvatar?: (e: Event) => void;
  formError: () => string;
};

export class ProfileEditPage extends Block<ProfileEditPageProps> {
  static componentName = 'Редактирование профиля';

  constructor(props: ProfileEditPageProps) {
    super(props);
    this.setProps({
      formError: () => this.props.store.getState().formErrors?.updateProfile || '',
      onUpdate: (e: Event) => {
        e.preventDefault();
        const values = getFormKeyValues(getFormValues(this.refs));
        const isValid = validateForm(this.refs);

        if (isValid) {
          const updateProfileData: UpdateProfileRequestData = {
            email: values.email || '',
            login: values.login || '',
            first_name: values.first_name || '',
            second_name: values.second_name || '',
            display_name: values.display_name || '',
            phone: values.phone || ''
          };

          const nextState = {
            values: updateProfileData
          };

          this.setState(nextState);

          this.props.store.dispatch(update, updateProfileData);
        }
      },
      onUpdateAvatar: (e: Event) => {
        e.preventDefault();
        const { files } = e.target as HTMLInputElement;
        if (files && files.length) {
          const avatarData = new FormData();
          avatarData.append('avatar', files[0]);

          this.props.store.dispatch(updateAvatar, avatarData);
        }
      }
    });

    const { user } = this.props;
    const nextState = {
      values: {
        email: user.email,
        login: user.login,
        first_name: user.firstName,
        second_name: user.secondName,
        display_name: user.displayName,
        phone: user.phone
      }
    };
    this.setState(nextState);
  }

  protected getStateFromProps() {
    this.state = {
      values: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        display_name: '',
        phone: ''
      }
    };
  }

  render() {
    const { user } = this.props;
    const { values } = this.state;

    // language=hbs
    return `
      <div class="fbox">

        {{{Link text="" to="settings" className="profile__back"}}}

        <main class="profile">

          <div class="profile-data">

            <form>
              <div class="profile-avatar">
                {{{Avatar url="${user.avatar}"}}}
                {{{InputWrap
                    name="avatar"
                    label="Поменять аватар"
                    type="file"
                    onChange=onUpdateAvatar
                }}}
              </div>
            </form>

            <form>

              {{{Error value=formError}}}

              <div class="profile-list">

                {{{InputWrap
                    name="email"
                    label="Почта"
                    type="email"
                    value="${values.email}"
                    required=true
                    validateRule="email"
                    ref="emailInput"
                }}}
                {{{InputWrap
                    name="login"
                    label="Логин"
                    type="text"
                    value="${values.login}"
                    required=true
                    validateRule="login"
                    ref="loginInput"
                }}}
                {{{InputWrap
                    name="first_name"
                    label="Имя"
                    type="text"
                    value="${values.first_name}"
                    validateRule="firstName"
                    ref="firstNameInput"
                }}}
                {{{InputWrap
                    name="second_name"
                    label="Фамилия"
                    type="text"
                    value="${values.second_name}"
                    validateRule="secondName"
                    ref="secondNameInput"
                }}}
                {{{InputWrap
                    name="display_name"
                    label="Имя в чате"
                    type="text"
                    value="${values.display_name}"
                    required=true
                    validateRule="notEmpty"
                    ref="displayNameInput"
                }}}
                {{{InputWrap
                    name="phone"
                    label="Телефон"
                    type="tel"
                    value="${values.phone}"
                    validateRule="phone"
                    ref="phoneInput"
                }}}

              </div>

              <div class="form-group form-group_btns">
                {{{Button
                    className="btn_primary w-100"
                    type="submit"
                    text="Сохранить"
                    onClick=onUpdate
                }}}
              </div>

            </form>

          </div>

        </main>

      </div>
    `;
  }
}

export default withUser(withRouter(withStore(ProfileEditPage)));
