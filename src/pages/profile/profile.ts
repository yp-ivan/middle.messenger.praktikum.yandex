import { Block, CoreRouter, Store } from 'core';
import { withUser, withRouter, withStore } from 'helpers';
import { logout } from 'services/auth';

import './profile.scss';

type ProfilePageProps = {
  router: CoreRouter;
  store: Store<AppState>;
  user: User;
  onLogout: (e: Event) => void;
};

export class ProfilePage extends Block<ProfilePageProps> {
  static componentName = 'Профиль';

  constructor(props: ProfilePageProps) {
    super(props);
    this.setProps({
      onLogout: (e: Event) => {
        e.preventDefault();
        this.props.store.dispatch(logout, {});
      }
    });
  }

  render() {
    const { user } = this.props;

    // language=hbs
    return `
      <div class="fbox">

        {{{Link text="" to="messenger" className="profile__back"}}}

        <main class="profile">

          <div class="profile-data">

            <div class="profile-avatar">
              {{{Avatar url="${user.avatar}"}}}
            </div>

            <h2 class="profile-name">${user.displayName}</h2>

            <div class="profile-list">
              {{{ProfileDataItem title="Почта" value="${user.email}"}}}
              {{{ProfileDataItem title="Логин" value="${user.login}"}}}
              {{{ProfileDataItem title="Имя" value="${user.firstName}"}}}
              {{{ProfileDataItem title="Фамилия" value="${user.secondName}"}}}
              {{{ProfileDataItem title="Имя в чате" value="${user.displayName}"}}}
              {{{ProfileDataItem title="Телефон" value="${user.phone}"}}}
            </div>

            <ul class="profile-links">
              <li>{{{Link text="Изменить данные" to="settings-edit"}}}</li>
              <li>{{{Link text="Изменить пароль" to="settings-password"}}}</li>
              <li>{{{Button text="Выйти" type="button" className="btn_link color-red" onClick=onLogout}}}</li>
            </ul>

          </div>

        </main>

      </div>
    `;
  }
}

export default withUser(withRouter(withStore(ProfilePage)));
