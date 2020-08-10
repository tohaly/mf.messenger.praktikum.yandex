const changeEvent = new Event('changeAuthorization');

export const authorization = new Proxy(
  {
    login: '',
  },
  {
    get(target: any, prop: any) {
      const value = target[prop];
      return value;
    },
    set(target, prop: any, value) {
      target[prop] = value;
      localStorage.setItem('login', value);
      document.dispatchEvent(changeEvent);
      return true;
    },
  }
);
