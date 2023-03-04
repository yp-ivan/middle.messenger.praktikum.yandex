import HTTPTransport, { METHODS } from 'helpers/HTTPTransport';

export function request<T extends any>({
  method,
  path,
  headers,
  data,
}: any): Promise<T> {

  return HTTPTransport.request(
    `${process.env.API_ENDPOINT}/${path}`,
    {
      method,
      headers: headers ? headers : { 'Content-Type': 'application/json' },
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
    .then((data) => {
      return data as T;
    })
}

request.get = <T>(path: string, data?: any, headers?: any) => request<T>({ method: METHODS.GET, path, headers, data });

request.post = <T>(path: string, data?: any, headers?: any) => request<T>({ method: METHODS.POST, path, headers, data });

request.put = <T>(path: string, data?: any, headers?: any) => request<T>({ method: METHODS.PUT, path, headers, data });

request.delete = <T>(path: string, data?: any, headers?: any) => request<T>({ method: METHODS.DELETE, path, headers, data });
