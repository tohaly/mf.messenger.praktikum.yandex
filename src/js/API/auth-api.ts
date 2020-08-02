import { BaseAPI } from "./base-api";

class AuthApi extends BaseAPI {
  _url: string;
  constructor(url: string) {
    super();
    this._url = this._baseUrl + url;
    console.log(this._url);
  }

  signup(body: { [key: string]: string }) {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
    const route = "signup";

    return this._http
      .post(this._url + route, options)
      .then((res: any) => this.getResponse(res));
  }

  signin(body: { [key: string]: string }) {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
    const route = "signin";

    return this._http
      .post(this._url + route, options)
      .then((res: any) => this.getResponse(res));
  }

  logout() {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    };
    const route = "logout";

    return this._http
      .request(this._url + route, options)
      .then((res: any) => this.getResponse(res));
  }

  getUserInfo() {
    const route = "user";
    return this._http
      .get(this._url + route)
      .then((res: any) => this.getResponse(res));
  }
}

export { AuthApi };
