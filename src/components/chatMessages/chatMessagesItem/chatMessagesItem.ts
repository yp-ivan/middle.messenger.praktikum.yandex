import Block from 'core/Block';
import { dateFormat } from 'helpers/utils/dateFormat';
import { escapeHTML } from 'helpers/utils/escapeText';

import './chatMessagesItem.scss';

export interface MessagesItemProps {
  type: string;
  text: string;
  time: string;
}

export class ChatMessagesItem extends Block<MessagesItemProps> {
  static componentName = 'ChatMessagesItem';

  render() {
    const timeFormat = dateFormat(this.props.time);
    const textFormat = escapeHTML(this.props.text);

    // language=hbs
    return `
      <div class="chat-message chat-message_{{type}}">
        <div class="chat-message__text">${textFormat}</div>
        <div class="chat-message__time">${timeFormat}</div>
      </div>
    `;
  }
}
