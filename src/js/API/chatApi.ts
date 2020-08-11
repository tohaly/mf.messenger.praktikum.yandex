import { BaseAPI } from './baseApi';

class ChatApi extends BaseAPI {
  handles = {
    CREATE_CHAT: '/chats/',
    GET_CHAT: '/chats/',
    AVATAR: '/chats/avatar',
  };

  createChat(body: objectKeyString) {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    const handle = this.getFullUrl(this.handles.CREATE_CHAT);

    return this._http.post(handle, options).then(this.getResponse);
  }

  getChats() {
    const handle = this.getFullUrl(this.handles.GET_CHAT);

    return this._http.get(handle).then(this.getResponseWithParse);
  }

  avatar(body: FormData) {
    const options = {
      body,
    };
    const handle = this.getFullUrl(this.handles.AVATAR);

    return this._http.put(handle, options).then(this.getResponse);
  }
}

export { ChatApi };
