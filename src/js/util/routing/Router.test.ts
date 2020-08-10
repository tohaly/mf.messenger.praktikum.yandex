import { Router } from './Router';
import { Block } from '../Block/Block';

describe('Router', () => {
  it('Проверка на подписку изменение хеша', () => {
    const router = new Router();
    const mock = jest.fn();

    jest.spyOn(router, '_onRoute').mockImplementation(() => {
      mock();
    });

    window.history.replaceState({}, '', '#signin');
    window.dispatchEvent(new HashChangeEvent('hashchange'));

    expect(mock).toBeCalled();

    mock.mockRestore();
  });

  it('Изменения хеша при вызове router.go', () => {
    const router = new Router();
    window.history.replaceState({}, '', '#home');
    router.go('#signin');
    expect(window.location.hash).toEqual('#signin');
  });

  it('Вызов страницы при изменении хеша', () => {
    const router = new Router();

    const Mock = jest.fn();

    jest.spyOn(router, '_onRoute').mockImplementation(() => {
      Mock();
    });

    router.use('#/signin', Mock).start();
    window.history.replaceState({}, '', '#/signin');

    expect(Mock).toBeCalled();
  });

  it('Вызов метода hide у компоненты', () => {
    const router = new Router();

    class Component extends Block {
      render() {
        return '<div>Hello</div>';
      }
    }
    class Component2 extends Block {
      render() {
        return '<div>Hello</div>';
      }
    }

    const mock = jest.fn();
    jest.spyOn(router, '_onRoute').mockImplementation(() => {
      mock();
    });
    Component.prototype.hide = mock;

    router.use('#/signin', Component).use('#/signup', Component2).start();

    window.history.replaceState({}, '', '#/signin');
    window.history.replaceState({}, '', '#/signup');

    expect(mock).toBeCalled();
  });

  it('Вызов метода show у компоненты', () => {
    const router = new Router();

    class Component extends Block {
      render() {
        return '<div>Hello</div>';
      }
    }
    class Component2 extends Block {
      render() {
        return '<div>Hello</div>';
      }
    }

    const mock = jest.fn();
    jest.spyOn(router, '_onRoute').mockImplementation(() => {
      mock();
    });
    Component.prototype.show = mock;

    router.use('#/signin', Component).use('#/signup', Component2).start();

    window.history.replaceState({}, '', '#/signin');
    window.history.replaceState({}, '', '#/signup');
    window.history.replaceState({}, '', '#/signin');

    expect(mock).toBeCalled();
  });
});
