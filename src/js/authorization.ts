const changeEvent = new Event('changeAuthorization');

export type proxyData = { login: string };
type proxyDataKeys = keyof proxyData;

export const authorization = new Proxy(
  {
    login: '',
  },
  {
    get(target: proxyData, prop: proxyDataKeys) {
      const value = target[prop];
      return value;
    },
    set(target: proxyData, prop: proxyDataKeys, value: string) {
      target[prop] = value;
      localStorage.setItem('login', value);
      document.dispatchEvent(changeEvent);
      return true;
    },
  }
);
