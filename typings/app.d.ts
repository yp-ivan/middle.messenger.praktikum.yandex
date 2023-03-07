declare global {
  export type Nullable<T> = T | null;
  export type Undefined<T> = T | undefined;
  export type NullObject = Record<string, never>;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type Indexed = { [key: string]: any };

  export type AppState = {
    appIsInited: boolean;
    page: Pages | null;
    user: User | null;
    chats: Chat[];
    chatSelected: number;
    chatMessages: ChatMessage[];
    formErrors: Record<string, string>;
  };

  export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
  };

  export type Chat = {
    id: number;
    title: string;
    avatar: string;
    createdBy: number;
    unreadCount: number;
    lastMessage: {
      user: User;
      time: string;
      content: string;
    } | null;
  }

  export type ChatMessage = {
    id: number;
    userId: number;
    chatId: number;
    time: string;
    type: 'message' | 'file';
    content: string;
    file?: string;
  }

  interface Window {
    store: Store<AppState>;
    router: CoreRouter;
  }

}

export {};
