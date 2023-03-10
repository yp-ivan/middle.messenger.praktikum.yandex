import HTTPTransport, { METHODS, RequestData, RequestOptions } from 'helpers/HTTPTransport';

interface ApiRequestOptions extends RequestOptions {
  path: string;
}

export function request<T>({
  method,
  path,
  headers,
  data }: ApiRequestOptions): Promise<T> {
  return HTTPTransport.request(
    `${process.env.API_ENDPOINT}/${path}`,
    {
      method,
      headers: headers || { 'Content-Type': 'application/json' },
      data
    }
  )
    // @ts-ignore
    .then((response: XMLHttpRequest) => {
      try {
        const isJson = response.getResponseHeader('content-type')?.includes('application/json');
        if (isJson) {
          return JSON.parse(response.responseText);
        }
        if (response.responseText.length && response.responseText !== 'OK') {
          return { reason: response.responseText };
        }
      } catch (e) {
        return { reason: response.responseText };
      }
      return {};
    })
    .then((data2) => data2 as T)
    .catch((err) => {
      console.error(`${method} [${path}]: ${err.responseText}`, err);
      try {
        return JSON.parse(err.responseText);
      } catch (e) {
        return { reason: err.responseText };
      }
    });
}

request.get = <T>(path: string, data?: RequestData, headers?: KeyValueString) => request<T>({ method: METHODS.GET, path, headers, data });

request.post = <T>(path: string, data?: RequestData, headers?: KeyValueString) => request<T>({ method: METHODS.POST, path, headers, data });

request.put = <T>(path: string, data?: RequestData, headers?: KeyValueString) => request<T>({ method: METHODS.PUT, path, headers, data });

request.delete = <T>(path: string, data?: RequestData, headers?: KeyValueString) => request<T>({ method: METHODS.DELETE, path, headers, data });
