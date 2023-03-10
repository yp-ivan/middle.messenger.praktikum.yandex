import { Block, CoreRouter, Store } from 'core';
import { withRouter, withStore } from 'helpers';
import { getChats } from 'services/chat';

import './chat.scss';

type ChatPageProps = {
  router: CoreRouter;
  store: Store<AppState>;
};

class ChatPage extends Block<ChatPageProps> {
  static componentName = 'Чат';

  constructor(props: ChatPageProps) {
    super(props);
    this.props.store.dispatch(getChats, {});
  }

  render() {
    // language=hbs
    return `
      <div class="fbox">
        <aside class="chat-aside">
          <div class="chat-aside__profile">
            {{{Link text="Профиль →" to="settings"}}}
          </div>
          <hr class="hr_chat-sep">
          {{{Chats}}}
        </aside>
        {{{ChatBox}}}
      </div>
    `;
  }
}

export default withRouter(withStore(ChatPage));
