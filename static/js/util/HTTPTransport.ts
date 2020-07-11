interface Window {
  HTTPTransport: object;
}

interface IHeaders {
  [key: string]: string;
}

type keys = keyof IHeaders;

interface IOptions {
  headers?: IHeaders;
  method?: string;
  body?: FormData;
  mode?: string;
  credentials?: string;
  cache?: string;
  timeout?: number;
}

// window.HTTPTransport = class {
//   METHODS: { [key: string]: string } = {
//     GET: "GET",
//   };
//   ERROR_NEED_METHOD = "Need method";
//   constructor() {
//     this.queryStringify = this.queryStringify.bind(this);
//   }
//   private getDeepParams = (
//     keyName: string,
//     object: { [key: string]: any }
//   ): string => {
//     return Object.keys(object).reduce((result, key, index, arr) => {
//       let params: string = `${keyName}[${key}]=${object[key]}`;

//       if (typeof object[key] === "object") {
//         params = this.getDeepParams(`${keyName}[${key}]`, object[key]);
//       }
//       return `${result}${params}${index < arr.length - 1 ? "&" : ""}`;
//     }, "");
//   };

//   private queryStringify = (data: { [key: string]: any }) => {
//     if (typeof data !== "object") {
//       throw new Error("Data not object");
//     }

//     const keys = Object.keys(data);
//     return keys.reduce((result, key, index) => {
//       let param = `${key}=${data[key]}`;

//       if (typeof data[key] === "object") {
//         console.log(true);
//         param = this.getDeepParams(key, data[key]);
//       }
//       return `${result}${param}${index < keys.length - 1 ? "&" : ""}`;
//     }, "");
//   };

//   public get = (url: string, options: IOptions = {}): Promise<unknown> => {
//     return this.request(url, { ...options, method: this.METHODS.GET });
//   };

//   public request = (url: string, options: IOptions = {}): Promise<unknown> => {
//     const { headers = {}, method, body, timeout = 5000 } = options;

//     return new Promise(function (resolve, reject) {
//       if (!method) {
//         reject(this.ERROR_NEED_METHOD);
//         return;
//       }

//       const xhr = new XMLHttpRequest();
//       const isGet = method === this.METHODS.GET;

//       xhr.open(
//         method,
//         isGet && !!body ? `${url}${this.queryStringify(body)}` : url
//       );

//       Object.keys(headers).forEach((key) => {
//         xhr.setRequestHeader(key, headers[key]);
//       });

//       xhr.onload = () => resolve(xhr);
//       xhr.onabort = reject;
//       xhr.onerror = reject;
//       xhr.timeout = timeout;
//       xhr.ontimeout = reject;

//       if (isGet || !body) {
//         xhr.send();
//       } else {
//         xhr.send(body);
//       }
//     });
//   };
// };
