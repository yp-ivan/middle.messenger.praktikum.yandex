import { registerComponent, PathRouter, Store } from 'core/index';
import { initApp } from 'services/initApp';
import { defaultState } from 'store/index';
import { initRouter } from 'router/index';
import { WSTransport } from 'helpers/WSTransport';
import config from 'data/config';

import './styles/all.scss';

import * as components from 'components/index';

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
    if (config.debug) {
      console.debug('store updated', nextState);
    }
  });

  initRouter(router, store);

  store.dispatch(initApp);
});
