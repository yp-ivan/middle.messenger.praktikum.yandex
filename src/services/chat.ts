import type { Dispatch } from 'core';
import { apiHasError } from 'helpers';
import { chatAPI, ChatsRequestData, CreateChatRequestData, DeleteChatRequestData, UsersChatRequestData } from 'api/chat';
import { transformChat } from 'helpers/apiTransformers';

export const getChats = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: ChatsRequestData
) => {
  const response = await chatAPI.getChats(action);
  if (apiHasError(response)) {
    return;
  }
  dispatch({ chats: response.map((item) => transformChat(item)) });
};

export const createChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: CreateChatRequestData
) => {
  const response = await chatAPI.createChat(action);
  if (apiHasError(response)) {
    return;
  }

  // Обновляем список чатов в store локально (без запроса API)
  const newChat = {
    id: response.id,
    title: action.title,
    avatar: null,
    created_by: state.user ? state.user.id : 0,
    last_message: null,
    unread_count: 0
  };
  dispatch({ chats: [transformChat(newChat), ...state.chats] });
};

export const deleteChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: DeleteChatRequestData
) => {
  const response = await chatAPI.deleteChat(action);
  if (apiHasError(response)) {
    return;
  }

  // Обновляем список чатов в store локально (без запроса API)
  const chats = state.chats.filter((chat) => chat.id !== action.chatId);
  dispatch({ chats });
};

export const addUsersChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: UsersChatRequestData
) => {
  const response = await chatAPI.addUsersChat(action);
  if (apiHasError(response)) {
    alert('Ошибка добавления пользователя.');
  }
};

export const deleteUsersChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: UsersChatRequestData
) => {
  const response = await chatAPI.deleteUsersChat(action);
  if (apiHasError(response)) {
    alert('Ошибка удаления пользователя.');
  }
};

export const tokenChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: number
) => {
  if (!action) return;
  const response = await chatAPI.tokenChat(action);
  if (apiHasError(response)) return;
  dispatch({ chatToken: response.token });
};
