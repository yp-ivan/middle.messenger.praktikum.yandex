import { UpdatePasswordRequestData, UpdateProfileRequestData, userAPI } from 'api/user';
import { UserDTO } from 'api/types';
import type { Dispatch } from 'core/index';
import { transformUser, apiHasError } from 'helpers/index';
import { authAPI } from 'api/auth';

const updateUserData = async (dispatch: Dispatch<AppState>) => {
  const response = await authAPI.getUser();
  if (!apiHasError(response)) {
    dispatch({ user: transformUser(response as UserDTO) });
  }
};

export const update = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: UpdateProfileRequestData
) => {
  const response = await userAPI.update(action);

  if (apiHasError(response)) {
    dispatch({
      formErrors: {
        updateProfile: response.reason
      }
    });
    return;
  }

  await updateUserData(dispatch);

  dispatch({ formErrors: {} });

  window.router.go('settings');
};

export const updatePassword = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: UpdatePasswordRequestData
) => {
  const response = await userAPI.updatePassword(action);

  if (apiHasError(response)) {
    dispatch({
      formErrors: {
        updatePassword: response.reason
      }
    });
    return;
  }

  dispatch({ formErrors: {} });

  window.router.go('settings');
};

export const updateAvatar = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: FormData
) => {
  const response = await userAPI.updateAvatar(action);

  if (apiHasError(response)) {
    dispatch({
      formErrors: {
        updateAvatar: response.reason
      }
    });
    return;
  }

  await updateUserData(dispatch);

  dispatch({ formErrors: {} });

  window.router.go('settings');
};
