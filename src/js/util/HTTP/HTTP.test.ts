import { HTTP, IOptions } from './HTTP';

describe('Тест HTTP', () => {
  it('Проверка вызова функции queryStringify', () => {
    XMLHttpRequest.prototype.open = jest.fn();
    XMLHttpRequest.prototype.setRequestHeader = jest.fn();
    XMLHttpRequest.prototype.send = jest.fn();

    const options: IOptions = {
      body: {
        name: 'Bob',
      },
    };

    const http = new HTTP();
    const spy = jest.spyOn(http, 'queryStringify');
    http.get('http://example.com', options);
    expect(spy).toHaveBeenCalled();
  });

  it('Был вызван метод XMLHttpRequest.send()', () => {
    const mock = jest.fn();
    XMLHttpRequest.prototype.open = jest.fn();
    XMLHttpRequest.prototype.setRequestHeader = jest.fn();
    XMLHttpRequest.prototype.send = mock;

    const options: IOptions = {
      method: 'POST',
      body: {
        name: 'Bob',
      },
    };

    const http = new HTTP();
    http.request('http://example.com', options);
    expect(mock).toBeCalled();
  });
});
