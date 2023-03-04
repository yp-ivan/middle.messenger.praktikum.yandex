import { UserDTO } from 'api/types';

export const transformUser = (data: UserDTO): User => {
  return {
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: transformDisplayName(data),
    avatar: transformAvatar(data.avatar),
    phone: data.phone,
    email: data.email,
  };
};

export const transformAvatar = (avatar: Nullable<string>) => avatar || '';

export const transformDisplayName = (data: Partial<UserDTO>) => {
  return data.display_name || `${data.first_name} ${data.second_name}`;
};
