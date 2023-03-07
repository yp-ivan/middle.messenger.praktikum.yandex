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

  await getChats(dispatch, state, {});
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

  await getChats(dispatch, state, {});
};

export const addUsersChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: UsersChatRequestData
) => {
  await chatAPI.addUsersChat(action);
};

export const deleteUsersChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: UsersChatRequestData
) => {
  await chatAPI.deleteUsersChat(action);
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
