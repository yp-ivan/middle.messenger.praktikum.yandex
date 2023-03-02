import { UpdatePasswordRequestData, UpdateProfileRequestData, userAPI } from 'api/user';
import { UserDTO } from 'api/types';
import type { Dispatch } from 'core';
import { transformUser, apiHasError } from 'helpers';
import { authAPI } from 'api/auth';

export const update = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: UpdateProfileRequestData,
) => {
  dispatch({ isLoading: true });

  const response = await userAPI.update(action);

  if (apiHasError(response)) {
    dispatch({
      isLoading: false,
      formErrors: {
        updateProfile: response.reason
      }
    });
    return;
  }

  await updateUserData(dispatch);

  dispatch({ isLoading: false, formErrors: {} });

  window.router.go('settings');
};

export const updatePassword = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: UpdatePasswordRequestData,
) => {
  dispatch({ isLoading: true });

  const response = await userAPI.updatePassword(action);

  if (apiHasError(response)) {
    dispatch({
      isLoading: false,
      formErrors: {
        updatePassword: response.reason
      }
    });
    return;
  }

  dispatch({ isLoading: false, formErrors: {} });

  window.router.go('settings');
};

export const updateAvatar = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: FormData,
) => {
  dispatch({ isLoading: true });

  const response = await userAPI.updateAvatar(action);

  if (apiHasError(response)) {
    dispatch({
      isLoading: false,
      formErrors: {
        updateAvatar: response.reason
      }
    });
    return;
  }

  await updateUserData(dispatch);

  dispatch({ isLoading: false, formErrors: {} });

  window.router.go('settings');
};


const updateUserData = async (dispatch: Dispatch<AppState>) => {
  const response = await authAPI.getUser();
  if (!apiHasError(response)) {
    dispatch({ user: transformUser(response as UserDTO) });
  }
}
