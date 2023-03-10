import { Block, Store } from 'core';
import { withStore, withUser } from 'helpers';
import { removeQuote } from 'helpers/utils/escapeText';

import './chatMessages.scss';

interface ChatMessagesProps {
  store: Store<AppState>;
  user: User;
}

class ChatMessages extends Block<ChatMessagesProps> {
  static componentName = 'ChatMessages';

  componentDidUpdate(oldProps: ChatMessagesProps, newProps: ChatMessagesProps) {
    // @todo перевести в mapStateToProps(chatMessages, chatSelected)
    return oldProps.store.getState().chatMessages.length !== newProps.store.getState().chatMessages.length
      || oldProps.store.getState().chatSelected !== newProps.store.getState().chatSelected;
  }

  render() {
    const userId = this.props.user.id;
    const messages = this.props.store.getState().chatMessages;

    if (!messages.length) {
      // language=hbs
      return `<div class="no-messages">Нет сообщений</div>`;
    }

    // language=hbs
    return `
      <div class="chat-messages">
        ${messages.map((message) => `
          {{{ChatMessagesItem
            type="${message.userId === userId ? 'out' : 'in'}"
            text="${removeQuote(message.content)}"
            time="${message.time}"
          }}}`).join('')}
      </div>
    `;
  }
}

export default withUser(withStore(ChatMessages));
