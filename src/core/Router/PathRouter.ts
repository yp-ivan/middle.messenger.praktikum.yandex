import { CoreRouter } from './CoreRouter';

export class PathRouter implements CoreRouter {
  private routes: RecordFunc = {};

  private isStarted = false;

  start() {
    if (!this.isStarted) {
      this.isStarted = true;
      window.onpopstate = (event: PopStateEvent) => {
        this.onRouteChange.call(this);
      };
      this.onRouteChange();
    }
  }

  onRouteChange() {
    const path = window.location.pathname.slice(1);

    const found = Object.entries(this.routes).some(([routePath, callback]) => {
      if (routePath === path) {
        callback();
        return true;
      }
      return false;
    });

    if (!found && this.routes['*']) {
      this.routes['*']();
    }
  }

  use(hash: string, callback: () => void) {
    this.routes[hash] = callback;
    return this;
  }

  getPath(pathname: string): string {
    return `/${pathname}`;
  }

  go(pathname: string) {
    window.history.pushState({}, '', this.getPath(pathname));
    this.onRouteChange();
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }
}
