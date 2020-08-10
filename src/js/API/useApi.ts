import { BaseAPI } from './baseApi';

class UserApi extends BaseAPI {
  _url: string;
  constructor() {
    super();
    this._url = this._baseUrl + '/user/';
  }

  avatar(body: FormData) {
    const options = {
      body,
    };
    const route = 'profile/avatar';

    return this._http
      .put(this._url + route, options)
      .then((res: any) => this.getResponseWithParse(res));
  }

  profile(body: { [key: string]: string }) {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    const route = 'profile';

    return this._http
      .put(this._url + route, options)
      .then((res: any) => this.getResponseWithParse(res));
  }

  changePassword(body: { [key: string]: string }) {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    const route = 'password';

    return this._http.put(this._url + route, options).then((res: any) => this.getResponse(res));
  }
}

export { UserApi };
