import { BlockClass } from 'core/index';
import * as pages from 'pages/index';

export enum Pages {
  Map = 'map',
  Login = 'login',
  Register = 'register',
  Profile = 'profile',
  ProfileEdit = 'profile-edit',
  ProfilePasswordEdit = 'profile-password',
  Chat = 'chat',
  Error404 = 'error404',
  Error500 = 'error500'

}

const map: Record<Pages, BlockClass> = {
  [Pages.Map]: pages.MapPage,
  [Pages.Login]: pages.LoginPage,
  [Pages.Register]: pages.RegisterPage,
  [Pages.Profile]: pages.ProfilePage,
  [Pages.ProfileEdit]: pages.ProfileEditPage,
  [Pages.ProfilePasswordEdit]: pages.ProfilePasswordPage,
  [Pages.Chat]: pages.ChatPage,
  [Pages.Error404]: pages.Error404Page,
  [Pages.Error500]: pages.Error500Page
};

export const getPageComponent = (page: Pages): BlockClass => map[page];
