import { UserDTO } from 'api/types';

export const transformUser = (data: UserDTO): User => {
  const displayName = data.display_name || `${data.first_name} ${data.second_name}`;
  return {
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
  };
};
