import { Pages } from 'helpers';

export const routes = [
  {
    path: 'map',
    block: Pages.Map,
    shouldAuthorized: false
  },
  {
    path: '',
    block: Pages.Login,
    shouldAuthorized: false
  },
  {
    path: 'sign-up',
    block: Pages.Register,
    shouldAuthorized: false
  },
  {
    path: 'settings',
    block: Pages.Profile,
    shouldAuthorized: true
  },
  {
    path: 'settings-edit',
    block: Pages.ProfileEdit,
    shouldAuthorized: true
  },
  {
    path: 'settings-password',
    block: Pages.ProfilePasswordEdit,
    shouldAuthorized: true
  },
  {
    path: 'messenger',
    block: Pages.Chat,
    shouldAuthorized: true
  },
  {
    path: '*',
    block: Pages.Error404,
    shouldAuthorized: false
  },
  {
    path: 'error-404',
    block: Pages.Error404,
    shouldAuthorized: false
  },
  {
    path: 'error-500',
    block: Pages.Error500,
    shouldAuthorized: false
  }
];
