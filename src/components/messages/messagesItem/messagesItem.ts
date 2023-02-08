import Block from 'core/Block';

import './messagesItem.scss';

export interface MessagesItemProps {
  type: string;
  text: string;
  time: string;
}

export class MessagesItem extends Block<MessagesItemProps> {
  static componentName = 'MessagesItem';

  constructor(props: MessagesItemProps) {
    super({
      ...props
    });
  }

  render() {
    // language=hbs
    return `
      <div class="chat-message chat-message_{{type}}">
        <div class="chat-message__text">
          {{text}}
        </div>
        <div class="chat-message__time">{{time}}</div>
      </div>
    `;
  }
}
