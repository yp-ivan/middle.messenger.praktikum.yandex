import { Block, Store } from 'core/index';
import { withStore, withUser, withWS } from 'helpers/index';
import { getFormKeyValues, getFormValues } from 'helpers/validate/validateForm';
import { WSTransport } from 'helpers/WSTransport';
import { UsersChatRequestData } from 'api/chat';
import { ChatMessageDTO } from 'api/types';
import { addUsersChat, deleteChat, deleteUsersChat } from 'services/chat';
import { transformChatMessage } from 'helpers/apiTransformers';

import './chatBox.scss';

interface ChatBoxProps {
  store: Store<AppState>;
  user: User;
  ws: WSTransport;
  chat: Nullable<Chat>;
  chatId: () => number;
  onDeleteChat?: (e: Event) => void;
  onAddUserChat?: (e: Event) => void;
  onDeleteUserChat?: (e: Event) => void;
  onSendMessage?: (e: Event) => void;
}

class ChatBox extends Block<ChatBoxProps> {
  static componentName = 'ChatBox';

  constructor(props: ChatBoxProps) {
    super(props);
    this.setProps({
      chat: this.getChat(),
      chatId: () => (this.props.chat ? this.props.chat.id : 0),
      onDeleteChat: this.onDeleteChat,
      onAddUserChat: this.onAddUserChat,
      onDeleteUserChat: this.onDeleteUserChat,
      onSendMessage: this.onSendMessage
    });
    this.wsStart();
  }

  wsStart() {
    const userId = this.props.user.id;
    const chatId = this.props.chatId();
    const token = this.props.store.getState().chatToken;

    if (this.props.ws && this.props.ws.start(userId, chatId, token)) {
      this.props.ws.addEvent('message', this.onWSMessage.bind(this));
    }
  }

  componentDidUpdate(oldProps: ChatBoxProps, newProps: ChatBoxProps): boolean {
    const oldId = oldProps.chat ? oldProps.chat.id : 0;
    const newId = newProps.chat ? newProps.chat.id : 0;
    return oldId !== newId;
  }

  onDeleteChat = (e: Event) => {
    const chatId = this.props.chatId();
    if (chatId && window.confirm('Вы действительно хотите удалить чат?')) {
      this.props.store.dispatch(deleteChat, { chatId });
      this.props.store.dispatch({ chatSelected: 0 });
    }
  };

  onAddUserChat = (e: Event) => {
    const text = prompt('Добавление пользователя\n\nВвести ID пользователя', '');
    if (text === null) {
      return;
    }
    const userId = parseInt(text, 10);
    const chatId = this.props.chatId();
    if (!userId || !chatId) {
      alert('Ошибка добавления пользователя\n\nНужно вводить ID пользователя.');
      return;
    }
    const payload: UsersChatRequestData = {
      users: [userId],
      chatId
    };
    this.props.store.dispatch(addUsersChat, payload);
  };

  onDeleteUserChat = (e: Event) => {
    const text = prompt('Удаление пользователя\n\nВвести ID пользователя', '');
    if (text === null) {
      return;
    }
    const userId = parseInt(text, 10);
    const chatId = this.props.chatId();
    if (!userId || !chatId) {
      alert('Ошибка удаления пользователя\n\nНужно вводить ID пользователя.');
      return;
    }
    const payload: UsersChatRequestData = {
      users: [userId],
      chatId
    };
    this.props.store.dispatch(deleteUsersChat, payload);
  };

  onSendMessage = (e: Event) => {
    e.preventDefault();
    const values = getFormKeyValues(getFormValues(this.refs));
    const message = values.chatMessage || '';
    if (this.props.ws && message) {
      this.props.ws.sendMessage(message);
    }
  };

  onWSMessage(e: MessageEvent) {
    let data: NullObject | [] = {};
    try {
      data = JSON.parse(e.data);
      const { chatMessages } = this.props.store.getState();
      let needUpdate = false;
      if (typeof data === 'object' && e.type === 'message') {
        if (Array.isArray(data)) {
          chatMessages.push(...this.addMessages(chatMessages, data.reverse()));
          needUpdate = true;
        } else if (data.type !== undefined && data.type === 'message') {
          chatMessages.push(...this.addMessages(chatMessages, [data as ChatMessage]));
          needUpdate = true;
        }
      }
      if (needUpdate) {
        this.props.store.dispatch({ chatMessages });
      }
    } catch (err) {
      console.error(err);
    }
  }

  addMessages(chatMessages: ChatMessage[], addMessages: ChatMessageDTO[]) {
    const newMsg: ChatMessage[] = [];
    addMessages.forEach((addMsg) => {
      if (chatMessages.findIndex((chatMsg) => chatMsg.id === addMsg.id) === -1) {
        newMsg.push(transformChatMessage(addMsg));
      }
    });
    return newMsg;
  }

  getChat() {
    const { chats } = this.props.store.getState();
    const { chatSelected } = this.props.store.getState();
    if (!chatSelected) return null;
    const chatIdx = chats.findIndex((chat) => chat.id === chatSelected);
    return (chatIdx === -1) ? null : chats[chatIdx];
  }

  render() {
    const { user, chat } = this.props;

    if (!user || !chat) {
      // language=hbs
      return `<div class="no-messages">Выберите чат, чтобы отправить сообщение</div>`;
    }

    // language=hbs
    return `
      <main class="chat-main">
        <div class="chat-profile">
          <div class="chat-profile__info">
          {{#with chat}}
            {{{Avatar url=avatar className="chat-profile__avatar"}}}
            <div class="chat-profile__name">{{title}}</div>
          {{/with}}
          </div>
          <div class="chat-profile__buttons">
            {{{Button
              text="Добавить пользователя"
              type="button"
              className="btn_sm"
              onClick=onAddUserChat
            }}}
            {{{Button
              text="Удалить пользователя"
              type="button"
              className="btn_sm"
              onClick=onDeleteUserChat
            }}}
            {{{Button
              text="Удалить чат"
              type="button"
              className="btn_sm btn_primary ${(user.id !== chat.createdBy) ? 'hide' : ''}"
              onClick=onDeleteChat
            }}}
          </div>
        </div>

        {{{ChatMessages}}}

        <div class="chat__send-message">
          <form class="form_send-message">
            {{{InputWrap
              name="chatMessage"
              type="text"
              placeholder="Сообщение"
              required=true
              ref="chatMessageInput"
            }}}
            {{{Button
              text=""
              type="submit"
              className="btn_send-message"
              onClick=onSendMessage
            }}}
          </form>
        </div>
      </main>
    `;
  }
}

export default withWS(withUser(withStore(ChatBox)));
