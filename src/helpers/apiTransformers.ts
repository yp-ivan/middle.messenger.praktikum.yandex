import { ChatDTO, ChatMessageDTO, UserDTO } from 'api/types';

export const transformAvatar = (avatar: Nullable<string>) => avatar || '';

export const transformDisplayName = (data: Partial<UserDTO>) => data.display_name || `${data.first_name} ${data.second_name}`;

export const transformUser = (data: UserDTO): User => ({
  id: data.id,
  login: data.login,
  firstName: data.first_name,
  secondName: data.second_name,
  displayName: transformDisplayName(data),
  avatar: transformAvatar(data.avatar),
  phone: data.phone,
  email: data.email
});

export const transformChat = (data: ChatDTO): Chat => {
  const lastMessage = data.last_message ? {
    user: transformUser(data.last_message.user),
    time: data.last_message.time,
    content: data.last_message.content
  } : {
    user: null,
    time: '',
    content: ''
  };
  return {
    id: data.id,
    title: data.title,
    avatar: transformAvatar(data.avatar),
    createdBy: data.created_by,
    unreadCount: data.unread_count,
    lastMessage
  };
};

export const transformChatMessage = (data: ChatMessageDTO): ChatMessage => ({
  id: data.id,
  userId: data.user_id,
  chatId: data.chat_id,
  time: data.time,
  type: data.type,
  content: data.content,
  file: data.file || ''
});
