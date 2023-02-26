import { authAPI, LoginRequestData, RegisterRequestData } from 'api/auth';
import { UserDTO } from 'api/types';
import type { Dispatch } from 'core';
import { transformUser, apiHasError } from 'helpers';

export const register = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: RegisterRequestData,
) => {
  dispatch({ isLoading: true });

  const response = await authAPI.register(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }

  const responseUser = await authAPI.getUser();

  dispatch({ isLoading: false });

  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser as UserDTO) });

  window.router.go('login');
};

export const login = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: LoginRequestData,
) => {
  dispatch({ isLoading: true });

  const response = await authAPI.login(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }

  const responseUser = await authAPI.getUser();

  dispatch({ isLoading: false });

  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: transformUser(responseUser as UserDTO) });

  window.router.go('profile');
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  await authAPI.logout();

  dispatch({ isLoading: false, user: null });

  window.router.go('login');
};
