require('babel-core/register');

import { registerComponent, HashRouter, Store } from 'core';
import { initApp } from 'services/initApp';
import { defaultState } from 'store';
import { initRouter } from 'router';

import './styles/all.scss';

import * as components from 'components';

Object.values(components).forEach((Component: any) => {
  registerComponent(Component);
});

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(defaultState);
  const router = new HashRouter();

  /**
   * Помещаем роутер и стор в глобальную область для доступа в хоках with*
   * @warning Не использовать такой способ на реальный проектах
   */
  window.router = router;
  window.store = store;

  store.on('changed', (prevState, nextState) => {
    if (process.env.DEBUG) {
      console.debug('store updated', nextState);
    }
  });

  initRouter(router, store);

  store.dispatch(initApp);

});
