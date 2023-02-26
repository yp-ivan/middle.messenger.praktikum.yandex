import { ErrorAPI } from 'api/types';

export function apiHasError(response: any): response is ErrorAPI {
  return response && response.reason;
}
