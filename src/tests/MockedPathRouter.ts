import { PathRouter } from 'core/index';

export class MockedPathRouter extends PathRouter {
  go(pathname: string) {
    window.location.pathname = this.getPath(pathname);
    this.onRouteChange();
  }
}
