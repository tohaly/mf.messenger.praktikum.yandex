type body = string | FormData;

interface IOptions {
  headers?: objectKeyString;
  method?: string;
  body?: body;
  timeout?: number;
}

interface IMethods {
  GET: string;
  POST: string;
  PUT: string;
}

interface IHTTP {
  METHODS: IMethods;
  ERROR_NEED_METHOD: string;
  getDeepParams(keyName: string, object: objectKeyString): string;
  queryStringify(data: objectKeyString): string;
  get(url: string, options?: IOptions): Promise<XMLHttpRequest>;
  post(url: string, options?: IOptions): Promise<XMLHttpRequest>;
  put(url: string, options?: IOptions): Promise<XMLHttpRequest>;
  request(url: string, options?: IOptions): Promise<unknown>;
}

class HTTP implements IHTTP {
  METHODS: IMethods;
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
  getDeepParams(keyName: string, object: objectKeyString): string {
    return Object.keys(object).reduce((result, key, index, arr) => {
      const obj = object[key];
      let params = `${keyName}[${key}]=${obj}`;

      if (typeof obj === 'object') {
        params = this.getDeepParams(`${keyName}[${key}]`, obj);
      }
      return `${result}${params}${index < arr.length - 1 ? '&' : ''}`;
    }, '');
  }

  queryStringify(data: objectKeyString): string {
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
    return new Promise<XMLHttpRequest>(
      function (resolve: (arg: XMLHttpRequest) => void, reject: <T>(arg: T) => void) {
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
