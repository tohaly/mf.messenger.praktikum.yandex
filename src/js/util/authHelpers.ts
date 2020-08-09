const LOGIN = 'login';

export const isAlreadyLogin = (obj: any) => {
  const name = localStorage.getItem(LOGIN);
  return name ? (obj[LOGIN] = name) : false;
};

export const setLogin = (obj: any, value: string) => {
  obj[LOGIN] = value;
  localStorage.setItem(LOGIN, value);
};

export const logoutHelper = (obj: any) => {
  obj[LOGIN] = '';
  localStorage.removeItem(LOGIN);
};
