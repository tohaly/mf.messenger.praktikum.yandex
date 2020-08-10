import { BaseAPI } from './baseApi';

class ChatApi extends BaseAPI {
  _url: string;
  constructor() {
    super();
    this._url = this._baseUrl + '/chats/';
  }

  createChat(body: { [key: string]: string }) {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    return this._http.post(this._url, options).then((res: any) => this.getResponse(res));
  }

  getChats() {
    return this._http.get(this._url).then((res: any) => this.getResponseWithParse(res));
  }

  avatar(body: any) {
    const options = {
      body,
    };
    const route = 'avatar';

    return this._http.put(this._url + route, options).then((res: any) => this.getResponse(res));
  }
}

export { ChatApi };
