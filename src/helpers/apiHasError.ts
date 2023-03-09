import { ErrorAPI } from 'api/types';

export const apiHasError = (response: any): response is ErrorAPI => {
  return response && response.reason
}
