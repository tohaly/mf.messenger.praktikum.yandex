import { proxyData } from '../authorization';

const LOGIN = 'login';

export const isAlreadyLogin = (obj: proxyData) => {
  const name = localStorage.getItem(LOGIN);
  return name ? (obj[LOGIN] = name) : false;
};

export const setLogin = (obj: proxyData, value: string) => {
  obj[LOGIN] = value;
  localStorage.setItem(LOGIN, value);
};

export const logoutHelper = (obj: proxyData) => {
  obj[LOGIN] = '';
  localStorage.removeItem(LOGIN);
};
