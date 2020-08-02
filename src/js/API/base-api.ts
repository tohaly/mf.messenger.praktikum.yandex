import { HTTP, IHTTP } from "../util/HTTP/HTTP";

interface IBaseAPI {
  _baseUrl: string;
  _http: IHTTP;
  getResponse(res: XMLHttpRequest): void;
}

abstract class BaseAPI implements IBaseAPI {
  _baseUrl: string;
  _http: IHTTP;
  constructor() {
    this._baseUrl = "https://ya-praktikum.tech/api/v2";
    this._http = new HTTP();
  }
  getResponse(res: XMLHttpRequest) {
    if (res.status === 200) {
      return res;
    }
    throw new Error(res.response);
  }
}

export { BaseAPI };
