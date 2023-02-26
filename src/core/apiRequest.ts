import HTTPTransport, { METHODS } from 'helpers/HTTPTransport';

export function request<T extends any>({
  method,
  path,
  data,
}: any): Promise<T> {

  return HTTPTransport.request(
    `${process.env.API_ENDPOINT}/${path}`,
    {
      method,
      headers: { 'Content-Type': 'application/json' },
      data
    }
  )
    // @ts-ignore
    .then((response: XMLHttpRequest) => {
      const isJson = response.getResponseHeader('content-type')?.includes('application/json');
      if (isJson) {
        return JSON.parse(response.responseText);
      }
      if (response.responseText.length) {
        return { reason: response.responseText };
      }
      return {};
    })
    .then((data) => {
      return data as T;
    })
}

request.get = <T>(path: string) => request<T>({ method: METHODS.GET, path });

request.post = <T>(path: string, data?: any) => request<T>({ method: METHODS.POST, path, data });

request.put = <T>(path: string, data?: any) => request<T>({ method: METHODS.PUT, path, data });

request.delete = <T>(path: string, data?: any) => request<T>({ method: METHODS.DELETE, path, data });
