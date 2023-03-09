import HTTPTransport, { METHODS, RequestData, RequestOptions } from 'helpers/HTTPTransport';

interface ApiRequestOptions extends RequestOptions {
  path: string;
}

export function request<T extends any>({
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
      const isJson = response.getResponseHeader('content-type')?.includes('application/json');
      if (isJson) {
        return JSON.parse(response.responseText);
      }
      if (response.responseText.length && response.responseText !== 'OK') {
        return { reason: response.responseText };
      }
      return {};
    })
    .then((data) => data as T);
}

request.get = <T>(path: string, data?: RequestData, headers?: KeyValueString) => request<T>({ method: METHODS.GET, path, headers, data });

request.post = <T>(path: string, data?: RequestData, headers?: KeyValueString) => request<T>({ method: METHODS.POST, path, headers, data });

request.put = <T>(path: string, data?: RequestData, headers?: KeyValueString) => request<T>({ method: METHODS.PUT, path, headers, data });

request.delete = <T>(path: string, data?: RequestData, headers?: KeyValueString) => request<T>({ method: METHODS.DELETE, path, headers, data });
