enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type KeyValueString = Record<string, string>;

type Options = {
  method?: METHODS;
  headers?: KeyValueString;
  data?: Document | XMLHttpRequestBodyInit | null;
  timeout?: number;
};

class HTTPTransport {
  get = (url: string, options = {}) => this.request(url, { ...options, method: METHODS.GET });

  post = (url: string, options = {}) => this.request(url, { ...options, method: METHODS.POST });

  put = (url: string, options = {}) => this.request(url, { ...options, method: METHODS.PUT });

  delete = (url: string, options = {}) => this.request(url, { ...options, method: METHODS.DELETE });

  qs(data?: KeyValueString) {
    if (typeof data !== 'object') {
      throw new Error('Data must be object');
    }
    const keys = Object.keys(data);
    return keys.reduce((result, key: string, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
  }

  request = (url: string, options: Options) => {
    const {
      method = METHODS.GET,
      headers = {},
      data,
      timeout = 5000
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      const fullUrl = url + (method === METHODS.GET) ? this.qs(data as unknown as KeyValueString) : '';

      xhr.open(method, fullUrl);

      if (timeout) {
        xhr.timeout = timeout;
      }

      Object.keys(headers).forEach((header) => {
        xhr.setRequestHeader(header, headers[header]);
      });

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          reject(xhr);
        } else {
          resolve(xhr);
        }
      };

      if (method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

export default new HTTPTransport();
