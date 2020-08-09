import { isEqual } from '../isEqual/isEqual';
import { render } from '../render';
import { IBlock } from '../Block/Block';

type routeProps = { [key: string]: any };
type blockConstructor = new (
  tagName?: string,
  props?: { [key: string]: string | boolean }
) => IBlock;

interface IRoute {
  _pathname: string;
  _blockClass: blockConstructor;
  _block: IBlock;
  _props: routeProps;

  navigate(pathname: string): void;
  leave(): void;
  match(pathname: string): boolean;
  render(): void;
}

class Route implements IRoute {
  _pathname: string;
  _blockClass: blockConstructor;
  _block: IBlock;
  _props: routeProps;
  constructor(pathname: string, view: blockConstructor, props: routeProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}

export { Route, IRoute, blockConstructor };
