import { request } from 'core/apiRequest';
import { ErrorAPI, UserDTO } from './types';

export type LoginRequestData = {
  login: string;
  password: string;
};

type LoginResponseData = NullObject | ErrorAPI;

export type RegisterRequestData = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
};

type RegisterResponseData = { id: number } | ErrorAPI;

export const authAPI = {
  register: (data: RegisterRequestData) => request.post<RegisterResponseData>('auth/signup', data),

  login: (data: LoginRequestData) => request.post<LoginResponseData>('auth/signin', data),

  getUser: () => request.get<UserDTO | ErrorAPI>('auth/user'),

  logout: () => request.post('auth/logout')
};
