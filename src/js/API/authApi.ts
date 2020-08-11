import { BaseAPI } from './baseApi';

class AuthApi extends BaseAPI {
  handles = {
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    GET_USER_INFO: '/auth/user',
  };

  signup(body: objectKeyString) {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    const handle = this.getFullUrl(this.handles.SIGNUP);

    return this._http.post(handle, options).then((res: XMLHttpRequest) => this.getResponse(res));
  }

  signin(body: objectKeyString) {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const handle = this.getFullUrl(this.handles.SIGNIN);

    return this._http.post(handle, options).then((res: XMLHttpRequest) => this.getResponse(res));
  }

  logout() {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const handle = this.getFullUrl(this.handles.LOGOUT);

    return this._http.post(handle, options).then(this.getResponse);
  }

  getUserInfo() {
    const handle = this.getFullUrl(this.handles.GET_USER_INFO);

    return this._http.get(handle).then(this.getResponseWithParse);
  }
}

export { AuthApi };
