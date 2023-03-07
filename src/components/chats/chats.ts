import { Block, Store } from 'core';
import { withStore } from 'helpers';
import { createChat } from 'services/chat';

import './chats.scss';

interface ChatsProps {
  store: Store<AppState>;
  onCreateChat: (e: Event) => void;
  chatsCount?: () => number;
}

export class Chats extends Block<ChatsProps> {
  static componentName = 'Chats';

  constructor(props: ChatsProps) {
    super(props);
    this.setProps({
      chatsCount: () => this.props.store.getState().chats.length,
      onCreateChat: this.onCreateChat
    });
  }

  onCreateChat = (e: Event) => {
    e.preventDefault();
    const title = prompt('Создание чата', '');
    if (title) {
      this.props.store.dispatch(createChat, { title });
    }
  };

  render() {
    const { chats } = this.props.store.getState();

    // language=hbs
    return `
      <div class="chat-aside__chats">
        {{{Button
          text="Создать чат"
          type="button"
          className="btn_sm btn_primary btn_add-chat"
          onClick=onCreateChat
        }}}
        <hr class="hr_chat-sep">
        {{#if chatsCount}}
          <div class="chats-list">
            ${chats.map((chat) => this.renderChatsItem(chat)).join('')}
          </div>
        {{else}}
          <div class="no-messages">Нет чатов</div>
        {{/if}}
      </div>
    `;
  }

  renderChatsItem(chat: Chat) {
    const lastMessage = chat.lastMessage ? chat.lastMessage.content : '';
    const time = chat.lastMessage ? chat.lastMessage.time : '';

    // language=hbs
    return `
      {{{ChatsItem
        chatId=${chat.id}
        name="${chat.title}"
        avatar="${chat.avatar}"
        lastMessage="${lastMessage}"
        time="${time}"
        unreadCount=${chat.unreadCount}
      }}}
    `;
  }
}

export default withStore(Chats);
