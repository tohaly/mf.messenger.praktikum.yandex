import { BaseAPI } from './baseApi';

class UserApi extends BaseAPI {
  handles = {
    AVATAR: '/user/profile/avatar',
    PROFILE: '/user/profile',
    PASSWORD: '/user/password',
  };

  getAvatar(body: FormData) {
    const options = {
      body,
    };
    const handle = this.getFullUrl(this.handles.AVATAR);

    return this._http.put(handle, options).then(this.getResponseWithParse);
  }

  profile(body: objectKeyString) {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    const handle = this.getFullUrl(this.handles.PROFILE);

    return this._http.put(handle, options).then(this.getResponseWithParse);
  }

  changePassword(body: objectKeyString) {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    const handle = this.getFullUrl(this.handles.PASSWORD);

    return this._http.put(handle, options).then(this.getResponse);
  }
}

export { UserApi };
