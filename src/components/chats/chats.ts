import { Block, Store } from 'core/index';
import { withStore } from 'helpers/index';
import { createChat } from 'services/chat';

import './chats.scss';

interface ChatsProps {
  store: Store<AppState>;
  chats: Chat[];
  onCreateChat: (e: Event) => void;
}

export class Chats extends Block<ChatsProps> {
  static componentName = 'Chats';

  constructor(props: ChatsProps) {
    super(props);
    this.setProps({
      chats: this.props.store.getState().chats,
      onCreateChat: this.onCreateChat
    });
  }

  onCreateChat = (e: Event) => {
    e.preventDefault();
    const title = prompt('Создание чата', '');
    if (title === null) {
      return;
    }
    if (!title) {
      alert('Ошибка создания чата');
      return;
    }
    this.props.store.dispatch(createChat, { title });
  };

  render() {
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
        {{#if chats}}
          <div class="chats-list">
            {{#each chats}}
              {{#with this}}
                {{{ChatsItem
                  chatId=id
                  name=title
                  avatar=avatar
                  lastMessage=lastMessage.content
                  time=lastMessage.time
                  unreadCount=unreadCount
                }}}
              {{/with}}
            {{/each}}
          </div>
        {{else}}
          <div class="no-messages">Нет чатов</div>
        {{/if}}
      </div>
    `;
  }
}

export default withStore(Chats);
