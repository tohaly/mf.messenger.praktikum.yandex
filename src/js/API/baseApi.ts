import { HTTP, IHTTP } from '../util/HTTP/HTTP';
import { API_URL } from '../constants';

interface IBaseAPI {
  _baseUrl: string;
  _http: IHTTP;
  getResponse(res: IResponse): IResponse | Promise<never>;
  getResponseWithParse(res: IResponse): objectKeyString | Promise<never>;
  getFullUrl(handle: string): string;
}

interface IResponse {
  status: number;
  responseText: string;
  response: string;
}

abstract class BaseAPI implements IBaseAPI {
  _baseUrl: string;
  _http: IHTTP;

  constructor() {
    this._http = new HTTP();
  }

  getResponse(res: IResponse): IResponse | Promise<never> {
    if (res.status === 200) {
      return res;
    }
    return Promise.reject(res);
  }

  getResponseWithParse(res: IResponse): objectKeyString | Promise<never> {
    if (res.status === 200) {
      return JSON.parse(res.response);
    }
    return Promise.reject(res);
  }

  getFullUrl(handle: string): string {
    return `${API_URL}${handle}`;
  }
}

export { BaseAPI };
