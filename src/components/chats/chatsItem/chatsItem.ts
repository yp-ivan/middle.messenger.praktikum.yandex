import { Block, Store } from 'core';
import { withStore } from 'helpers';
import { dateFormat } from 'helpers/utils/dateFormat';

import './chatsItem.scss';

export interface ChatsItemProps {
  store: Store<AppState>;
  chatId: number;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  selected?: boolean;
}

interface ChatsItemSuperProps extends ChatsItemProps {
  events: {
    click?: (e: Event) => void;
  }
}

export class ChatsItem extends Block<ChatsItemProps> {
  static componentName = 'ChatsItem';

  constructor(props: ChatsItemProps) {
    super(props);
    this.setProps({
      selected: props.chatId === props.store.getState().chatSelected,
      events: {
        click: this.onClick
      }
    } as ChatsItemSuperProps);
  }

  onClick = (e: Event) => {
    e.preventDefault();
    if (!this.props.selected) {
      this.props.store.dispatch({
        chatSelected: this.props.chatId,
        chatMessages: []
      });
    }
  };

  render() {
    // language=hbs
    return `
      <article class="chat-item {{#if selected}}active{{/if}}">
        <div class="chat-item__left">
          {{{Avatar url=avatar className="chat-item__avatar"}}}
        </div>
        <div class="chat-item__right">
          <div class="chat-item__header">
            <h3 class="chat-item__title">{{name}}</h3>
            <div class="chat-item__date">${dateFormat(this.props.time)}</div>
          </div>
          <div class="chat-item__body">
            <div class="chat-item__text">
              {{#if lastMessage}}
                {{lastMessage}}
              {{else}}
                <em>Нет сообщений</em>
              {{/if}}
            </div>
            <div class="chat-item__count">
              {{#if unreadCount}}
                <span class="chat-item__cnt">{{unreadCount}}</span>
              {{/if}}
            </div>
          </div>
        </div>
      </article>
    `;
  }
}

export default withStore(ChatsItem);
