import { request } from 'core/apiRequest';
import { ErrorAPI, UserDTO } from './types';

export type UpdateProfileRequestData = {
  'first_name': 'string';
  'second_name': 'string';
  'display_name': 'string';
  'login': 'string';
  'email': 'string';
  'phone': 'string';
}

export type UpdatePasswordRequestData = {
  oldPassword: string;
  newPassword: string;
};

export type SearchRequestData = {
  'login': 'string';
}

export const userAPI = {
  update: (data: UpdateProfileRequestData) => request.put<UserDTO | ErrorAPI>('user/profile', data),

  updateAvatar: (data: FormData) => request.put<UserDTO | ErrorAPI>('user/profile/avatar', data, {}),

  updatePassword: (data: UpdatePasswordRequestData) => request.put<UserDTO | ErrorAPI>('user/password', data),

  get: (id: number) => request.get<UserDTO | ErrorAPI>(`user/${id}`),

  search: (data: SearchRequestData) => request.post<UserDTO[] | ErrorAPI>('user/search', data),
};
