import { request } from 'core/apiRequest';
import { ChatDTO, ErrorAPI } from './types';

export type ChatsRequestData = {
  offset?: number;
  limit?: number;
  title?: string;
}

export type CreateChatRequestData = {
  title: string;
}

type CreateChatResponseData = {
  id: number
};

export type DeleteChatRequestData = {
  chatId: number;
}

type DeleteChatResponseData = {
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
  }
};

export type UsersChatRequestData = {
  users: number[];
  chatId: number;
}

export type TokenChatResponseData = {
  token: string;
}

export const chatAPI = {

  getChats: (data: ChatsRequestData) => request.get<ChatDTO[] | ErrorAPI>('chats', data),

  createChat: (data: CreateChatRequestData) => request.post<CreateChatResponseData | ErrorAPI>('chats', data),

  deleteChat: (data: DeleteChatRequestData) => request.delete<DeleteChatResponseData | ErrorAPI>('chats', data),

  addUsersChat: (data: UsersChatRequestData) => request.put<{} | ErrorAPI>('chats/users', data),

  deleteUsersChat: (data: UsersChatRequestData) => request.delete<{} | ErrorAPI>('chats/users', data),

  tokenChat: (id: number) => request.post<TokenChatResponseData | ErrorAPI>(`chats/token/${id}`),

};
