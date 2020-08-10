type headersStringKey = { [key: string]: string };
type deepObject = { [key: string]: string | deepObject };
type modeType = 'same-origin' | 'no-cors' | 'cors';
// type credentialsType = "omit" | "same-origin" | "include";
type cacheType = 'default»' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached';

interface IOptions {
  headers?: headersStringKey;
  method?: string;
  body?: any;
  mode?: modeType;
  credentials?: string;
  cache?: cacheType;
  timeout?: number;
}

interface IHTTP {
  METHODS: any;
  ERROR_NEED_METHOD: string;
  getDeepParams(keyName: string, object: deepObject): string;
  queryStringify(data: deepObject): string;
  get(url: string, options?: IOptions): Promise<XMLHttpRequest>;
  post(url: string, options?: IOptions): Promise<XMLHttpRequest>;
  put(url: string, options?: IOptions): Promise<XMLHttpRequest>;
  request(url: string, options?: IOptions): Promise<unknown>;
}

class HTTP implements IHTTP {
  METHODS: any;
  ERROR_NEED_METHOD = 'Need to specify a method';
  constructor() {
    this.METHODS = {
      GET: 'GET',
      POST: 'POST',
      PUT: 'PUT',
    };
    this.queryStringify = this.queryStringify.bind(this);
    this.request = this.request.bind(this);
  }
  getDeepParams(keyName: string, object: deepObject): string {
    return Object.keys(object).reduce((result, key, index, arr) => {
      const obj = object[key];
      let params = `${keyName}[${key}]=${obj}`;

      if (typeof obj === 'object') {
        params = this.getDeepParams(`${keyName}[${key}]`, obj);
      }
      return `${result}${params}${index < arr.length - 1 ? '&' : ''}`;
    }, '');
  }

  queryStringify(data: deepObject): string {
    if (typeof data !== 'object') {
      throw new Error('Data not object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
      const obj = data[key];
      let param = `${key}=${obj}`;

      if (typeof obj === 'object') {
        param = this.getDeepParams(key, obj);
      }
      return `${result}${param}${index < keys.length - 1 ? '&' : ''}`;
    }, '');
  }

  get(url: string, options: IOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: this.METHODS.GET });
  }

  post(url: string, options: IOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: this.METHODS.POST });
  }

  put(url: string, options: IOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: this.METHODS.PUT });
  }

  request(url: string, options: IOptions = {}): Promise<XMLHttpRequest> {
    const { headers = {}, method, body, timeout = 5000 } = options;
    return new Promise(
      function (resolve: any, reject: any) {
        if (!method) {
          reject(this.ERROR_NEED_METHOD);
          return;
        }

        const xhr = new XMLHttpRequest();
        const isGet = method === this.METHODS.GET;

        xhr.open(method, isGet && !!body ? `${url}${this.queryStringify(body)}` : url);

        xhr.withCredentials = true;
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
        xhr.onload = () => resolve(xhr);
        xhr.onabort = reject;
        xhr.onerror = reject;
        xhr.timeout = timeout;
        xhr.ontimeout = reject;
        if (isGet || !body) {
          xhr.send();
        } else {
          xhr.send(body);
        }
      }.bind(this)
    );
  }
}

export { HTTP, IOptions, IHTTP };
