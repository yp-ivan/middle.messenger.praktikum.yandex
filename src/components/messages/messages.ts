import Block from 'core/Block';

import messages from 'data/channelMessages.json';
import { MessagesItemProps } from './messagesItem';

import './messages.scss';

interface MessagesProps {
  text: string;
  to: string;
  className?: string;
}

export class Messages extends Block {
  static componentName = 'Messages';

  constructor(props: MessagesProps) {
    super({
      ...props
    });
  }

  render() {
    // language=hbs
    return `
      <div class="messages-list">
        ${(messages.data as MessagesItemProps[]).map((message) => `
          {{{MessagesItem
            type="${message.type}"
            text="${message.text}"
            time="${message.time}"
          }}}`).join('')}
      </div>
    `;
  }
}
