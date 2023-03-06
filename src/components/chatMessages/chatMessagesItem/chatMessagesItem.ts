import Block from 'core/Block';
import { dateFormat } from 'helpers/utils/dateFormat';

import './chatMessagesItem.scss';

export interface MessagesItemProps {
  type: string;
  text: string;
  time: string;
}

export class ChatMessagesItem extends Block<MessagesItemProps> {
  static componentName = 'ChatMessagesItem';

  render() {
    // language=hbs
    return `
      <div class="chat-message chat-message_{{type}}">
        <div class="chat-message__text">{{text}}</div>
        <div class="chat-message__time">${dateFormat(this.props.time)}</div>
      </div>
    `;
  }
}
