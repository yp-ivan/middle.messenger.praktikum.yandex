import { Pages } from 'helpers';

export const routes = [
  {
    path: 'map',
    block: Pages.Map,
    shouldAuthorized: false,
    shouldGuest: false
  },
  {
    path: '',
    block: Pages.Login,
    shouldAuthorized: false,
    shouldGuest: true
  },
  {
    path: 'sign-up',
    block: Pages.Register,
    shouldAuthorized: false,
    shouldGuest: true
  },
  {
    path: 'settings',
    block: Pages.Profile,
    shouldAuthorized: true,
    shouldGuest: false
  },
  {
    path: 'settings-edit',
    block: Pages.ProfileEdit,
    shouldAuthorized: true,
    shouldGuest: false
  },
  {
    path: 'settings-password',
    block: Pages.ProfilePasswordEdit,
    shouldAuthorized: true,
    shouldGuest: false
  },
  {
    path: 'messenger',
    block: Pages.Chat,
    shouldAuthorized: true,
    shouldGuest: false
  },
  {
    path: '*',
    block: Pages.Error404,
    shouldAuthorized: false,
    shouldGuest: false
  },
  {
    path: 'error-404',
    block: Pages.Error404,
    shouldAuthorized: false,
    shouldGuest: false
  },
  {
    path: 'error-500',
    block: Pages.Error500,
    shouldAuthorized: false,
    shouldGuest: false
  }
];
