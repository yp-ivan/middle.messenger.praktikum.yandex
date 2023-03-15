import { CoreRouter } from './CoreRouter';

export class HashRouter implements CoreRouter {
  private routes: RecordFunc = {};

  private isStarted = false;

  start() {
    if (!this.isStarted) {
      this.isStarted = true;
      window.addEventListener('hashchange', () => this.onRouteChange());
      this.onRouteChange();
    }
  }

  onRouteChange() {
    const hash = window.location.hash.slice(1);

    const found = Object.entries(this.routes).some(([routeHash, callback]) => {
      if (routeHash === hash) {
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

  getPath(hash: string): string {
    return `#${hash}`;
  }

  go(hash: string) {
    window.location.hash = this.getPath(hash);
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }
}
