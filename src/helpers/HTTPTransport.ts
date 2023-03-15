export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export type RequestData = Indexed | null;

export interface RequestOptions {
  method: METHODS;
  headers?: KeyValueString;
  data?: RequestData;
  timeout?: number;
}

class HTTPTransport {
  get = (url: string, options = {}) => this.request(url, { ...options, method: METHODS.GET });

  post = (url: string, options = {}) => this.request(url, { ...options, method: METHODS.POST });

  put = (url: string, options = {}) => this.request(url, { ...options, method: METHODS.PUT });

  delete = (url: string, options = {}) => this.request(url, { ...options, method: METHODS.DELETE });

  qs(data?: KeyValueString | null) {
    if (typeof data !== 'object') {
      throw new Error('Data must be object');
    }
    if (data === null) {
      return '';
    }
    const keys = Object.keys(data);
    return keys.reduce((result, key: string, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
  }

  request = (url: string, options: RequestOptions) => {
    const {
      method,
      headers = {},
      data = null,
      timeout = 5000
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      let fullUrl = url;
      if (method === METHODS.GET) {
        fullUrl += this.qs(data as KeyValueString);
      }

      xhr.open(method, fullUrl);

      if (timeout) {
        xhr.timeout = timeout;
      }

      xhr.withCredentials = true;

      Object.keys(headers).forEach((header) => {
        xhr.setRequestHeader(header, headers[header]);
      });

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else {
          reject(xhr);
        }
      };

      if (method === METHODS.GET) {
        xhr.send();
      } else if (data && headers['Content-Type'] !== undefined && headers['Content-Type'] === 'application/json') {
        xhr.send(JSON.stringify(data));
      } else {
        // @ts-ignore
        xhr.send(data);
      }
    });
  };
}

export default new HTTPTransport();
