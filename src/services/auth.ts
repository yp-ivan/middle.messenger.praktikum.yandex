import { authAPI, LoginRequestData, RegisterRequestData } from 'api/auth';
import { UserDTO } from 'api/types';
import type { Dispatch } from 'core/index';
import { transformUser, apiHasError } from 'helpers/index';

export const register = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: RegisterRequestData
) => {
  const response = await authAPI.register(action);

  if (apiHasError(response)) {
    dispatch({
      formErrors: {
        register: response.reason
      }
    });
    return;
  }

  const responseUser = await authAPI.getUser();

  dispatch({ formErrors: {} });

  if (apiHasError(responseUser)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser as UserDTO) });

  window.router.go('messenger');
};

export const login = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: LoginRequestData
) => {
  const response = await authAPI.login(action);

  if (apiHasError(response)) {
    dispatch({
      formErrors: {
        login: response.reason
      }
    });
    return;
  }

  const responseUser = await authAPI.getUser();

  dispatch({ formErrors: {} });

  if (apiHasError(responseUser)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser as UserDTO) });

  window.router.go('messenger');
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  await authAPI.logout();

  dispatch({ user: null });

  window.router.go('');
};
