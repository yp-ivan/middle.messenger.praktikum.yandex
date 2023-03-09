import { authAPI } from 'api/auth';
import type { Dispatch } from 'core';
import { transformUser, apiHasError } from 'helpers';

export const initApp = async (dispatch: Dispatch<AppState>) => {
  try {
    const response = await authAPI.getUser();

    if (apiHasError(response)) {
      return;
    }

    dispatch({ user: transformUser(response) });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
};
