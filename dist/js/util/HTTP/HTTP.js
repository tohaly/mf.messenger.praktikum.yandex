class HTTP {
    constructor() {
        this.ERROR_NEED_METHOD = "Need to specify a method";
        this.METHODS = {
            GET: "GET",
        };
        this.queryStringify = this.queryStringify.bind(this);
        this.request = this.request.bind(this);
    }
    getDeepParams(keyName, object) {
        return Object.keys(object).reduce((result, key, index, arr) => {
            let obj = object[key];
            let params = `${keyName}[${key}]=${obj}`;
            if (typeof obj === "object") {
                params = this.getDeepParams(`${keyName}[${key}]`, obj);
            }
            return `${result}${params}${index < arr.length - 1 ? "&" : ""}`;
        }, "");
    }
    queryStringify(data) {
        if (typeof data !== "object") {
            throw new Error("Data not object");
        }
        const keys = Object.keys(data);
        return keys.reduce((result, key, index) => {
            let obj = data[key];
            let param = `${key}=${obj}`;
            if (typeof obj === "object") {
                param = this.getDeepParams(key, obj);
            }
            return `${result}${param}${index < keys.length - 1 ? "&" : ""}`;
        }, "");
    }
    get(url, options = {}) {
        return this.request(url, Object.assign(Object.assign({}, options), { method: this.METHODS.GET }));
    }
    request(url, options = {}) {
        const { headers = {}, method, body, timeout = 5000 } = options;
        return new Promise(function (resolve, reject) {
            if (!method) {
                reject(this.ERROR_NEED_METHOD);
                return;
            }
            const xhr = new XMLHttpRequest();
            const isGet = method === this.METHODS.GET;
            xhr.open(method, isGet && !!body ? `${url}${this.queryStringify(body)}` : url);
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
            }
            else {
                xhr.send(body);
            }
        }.bind(this));
    }
}
export { HTTP };
