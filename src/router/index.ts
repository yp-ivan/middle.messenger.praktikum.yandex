import { Store, renderDOM, CoreRouter } from 'core';
import { getPageComponent, Pages } from 'helpers';
import { routes } from './routes';

export const initRouter = (router: CoreRouter, store: Store<AppState>) => {
  routes.forEach((route) => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user);
      const currentPage = Boolean(store.getState().page);
      const { shouldAuthorized, shouldGuest } = route

      if ((isAuthorized && shouldAuthorized)
        || (!isAuthorized && shouldGuest)
        || (!shouldGuest && !shouldAuthorized)) {
        store.dispatch({ page: route.block });
        return;
      }

      if (!currentPage) {
        store.dispatch({ page: Pages.Map });
      }
    });
  });

  /**
   * Глобальный слушатель изменений в store для переключения страницы
   */
  store.on('changed', (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }

    if (prevState.page !== nextState.page) {
      const Page = getPageComponent(nextState.page);
      renderDOM(new Page({}));
      document.title = `Messenger / ${Page.componentName}`;
    }
  });
}
