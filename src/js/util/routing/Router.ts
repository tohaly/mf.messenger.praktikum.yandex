import { Route, IRoute, blockConstructor } from './Route';

interface IRouter {
  rootQuery: string;
  routes: IRoute[];
  history: History;
  _currentRoute: IRoute;
  _rootQuery: string;
  __instance: IRouter;
  isProtect: boolean;
  _defaultPath: string;
  _handleHashChange(): void;
  use(pathname: string, block: blockConstructor): this;
  useDefault(pathname: string, block: blockConstructor): this;
  useProtect(pathname: string, block: blockConstructor): this;
  start(): void;
  _onRoute(pathname: string): void;
  go(pathname: string): void;
  back(): void;
  forward(): void;
  getRoute(pathname: string): IRoute;
}

class Router implements IRouter {
  rootQuery: string;
  routes: IRoute[];
  history: History;
  _currentRoute: IRoute;
  _rootQuery: string;
  __instance: IRouter;
  isProtect: boolean;
  _defaultPath: string;
  static __instance: IRouter;
  constructor(rootQuery?: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    this._defaultPath;
    this.isProtect = true;

    Router.__instance = this;

    window.addEventListener('hashchange', this._handleHashChange);
  }

  _handleHashChange = (): void => {
    const path = window.location.hash;
    this._onRoute(path);
  };

  use(pathname: string, block: blockConstructor): this {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  useDefault(pathname: string, block: blockConstructor): this {
    const route = new Route(pathname, block, {
      rootQuery: this._rootQuery,
    });
    this._defaultPath = pathname;
    this.routes.push(route);
    return this;
  }

  useProtect(pathname: string, block: blockConstructor): this {
    const route = new Route(pathname, block, {
      rootQuery: this._rootQuery,
      protect: true,
    });
    this.routes.push(route);
    return this;
  }

  start(): void {
    window.onpopstate = ((event: any): void => {
      this._onRoute(event.currentTarget.location.hash);
    }).bind(this);

    this._onRoute(window.location.hash);
  }

  _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      this.go('#/notfound');
      return;
    }
    if (route._props.protect && this.isProtect) {
      this.go(this._defaultPath);
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string): IRoute {
    return this.routes.find((route) => {
      return route._pathname.match(pathname);
    });
  }
}

export { Router, IRouter };
