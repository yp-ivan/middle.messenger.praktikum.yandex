import { BlockClass } from 'core';
import MapPage from 'pages/map';
import LoginPage from 'pages/login';
import ProfilePage, { ProfileEditPage, ProfilePasswordPage } from 'pages/profile';
import RegisterPage from 'pages/register';
import Error404Page from 'pages/error404';
import Error500Page from 'pages/error500';
import ChatPage from 'pages/chat';

export enum Pages {
  Map = 'map',
  Login = 'login',
  Register = 'register',
  Profile = 'profile',
  ProfileEdit = 'profile-edit',
  ProfilePasswordEdit = 'profile-password',
  Chat = 'chat',
  Error404 = 'error404',
  Error500 = 'error500',

}

const map: Record<Pages, BlockClass<any>> = {
  [Pages.Map]: MapPage,
  [Pages.Login]: LoginPage,
  [Pages.Register]: RegisterPage,
  [Pages.Profile]: ProfilePage,
  [Pages.ProfileEdit]: ProfileEditPage,
  [Pages.ProfilePasswordEdit]: ProfilePasswordPage,
  [Pages.Chat]: ChatPage,
  [Pages.Error404]: Error404Page,
  [Pages.Error500]: Error500Page,
};

export const getPageComponent = (page: Pages): BlockClass<any> => {
  return map[page];
};
