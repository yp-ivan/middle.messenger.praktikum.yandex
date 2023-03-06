export type ErrorAPI = {
  reason: string;
};

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string | null;
  avatar: string | null;
  phone: string;
  email: string;
};

export type ChatDTO = {
  id: number;
  title: string;
  avatar: string;
  created_by: number;
  unread_count: number;
  last_message: {
    user: UserDTO;
    time: string;
    content: string;
  };
};

export type ChatMessageDTO = {
  id: number;
  user_id: number;
  chat_id: number;
  time: string;
  type: ChatMessageTypeDTO;
  content: string;
  file?: string;
}

export type ChatMessageTypeDTO = 'message' | 'file';
