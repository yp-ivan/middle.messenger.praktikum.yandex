import { PathRouter } from 'core/index';

export class MockedPathRouter extends PathRouter {
  go(pathname: string) {
    // replaced line: window.history.pushState({}, '', this.getPath(pathname));
    window.location.pathname = this.getPath(pathname);
    this.onRouteChange();
  }
}
