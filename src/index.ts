require('babel-core/register');

import { registerComponent, PathRouter, Store } from 'core';
import { initApp } from 'services/initApp';
import { defaultState } from 'store';
import { initRouter } from 'router';
import { WSTransport } from 'helpers/WSTransport';

import './styles/all.scss';

import * as components from 'components';

Object.values(components).forEach((Component: any) => {
  registerComponent(Component);
});

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(defaultState);
  const router = new PathRouter();
  const ws = new WSTransport();

  /**
   * Помещаем роутер и стор в глобальную область для доступа в хоках with*
   * @warning Не использовать такой способ на реальный проектах
   */
  window.router = router;
  window.store = store;
  window.ws = ws;

  store.on('changed', (prevState, nextState) => {
    if (process.env.DEBUG) {
      console.debug('store updated', nextState);
    }
  });

  initRouter(router, store);

  store.dispatch(initApp);
});
