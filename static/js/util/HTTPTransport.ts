type headersStringKey = { [key: string]: string };
type deepObject = { [key: string]: string | deepObject };
type modeType = "same-origin" | "no-cors" | "cors";
type credentialsType = "omit" | "same-origin" | "include";
type cacheType =
  | "default»"
  | "no-store"
  | "reload"
  | "no-cache"
  | "force-cache"
  | "only-if-cached";

interface IOptions {
  headers?: headersStringKey;
  method?: string;
  body?: FormData;
  mode?: modeType;
  credentials?: credentialsType;
  cache?: cacheType;
  timeout?: number;
}

interface IHTTPTransport {
  METHODS: { GET: string };
  ERROR_NEED_METHOD: string;
  getDeepParams(keyName: string, object: deepObject): string;
  queryStringify(data: deepObject): string;
  get(url: string, options?: IOptions): Promise<unknown>;
  request(url: string, options?: IOptions): Promise<unknown>;
}

interface Window {
  HTTPTransport: new () => IHTTPTransport;
}

(function () {
  class HTTPTransport implements IHTTPTransport {
    readonly METHODS = {
      GET: "GET",
    };
    readonly ERROR_NEED_METHOD = "Need to specify a method";
    constructor() {
      this.queryStringify = this.queryStringify.bind(this);
    }
    getDeepParams = (keyName: string, object: deepObject): string => {
      return Object.keys(object).reduce((result, key, index, arr) => {
        let obj = object[key];
        let params: string = `${keyName}[${key}]=${obj}`;

        if (typeof obj === "object") {
          params = this.getDeepParams(`${keyName}[${key}]`, obj);
        }
        return `${result}${params}${index < arr.length - 1 ? "&" : ""}`;
      }, "");
    };

    queryStringify = (data: deepObject): string => {
      if (typeof data !== "object") {
        throw new Error("Data not object");
      }

      const keys = Object.keys(data);
      return keys.reduce((result, key, index) => {
        let obj = data[key];
        let param = `${key}=${obj}`;

        if (typeof obj === "object") {
          console.log(true);
          param = this.getDeepParams(key, obj);
        }
        return `${result}${param}${index < keys.length - 1 ? "&" : ""}`;
      }, "");
    };

    get = (url: string, options: IOptions = {}): Promise<unknown> => {
      return this.request(url, { ...options, method: this.METHODS.GET });
    };

    request = (url: string, options: IOptions = {}): Promise<unknown> => {
      const { headers = {}, method, body, timeout = 5000 } = options;

      return new Promise(function (resolve, reject) {
        if (!method) {
          reject(this.ERROR_NEED_METHOD);
          return;
        }

        const xhr = new XMLHttpRequest();
        const isGet = method === this.METHODS.GET;

        xhr.open(
          method,
          isGet && !!body ? `${url}${this.queryStringify(body)}` : url
        );

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
      });
    };
  }

  window.HTTPTransport = HTTPTransport;
})();