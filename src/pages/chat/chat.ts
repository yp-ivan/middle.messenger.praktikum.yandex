import { Block, CoreRouter, Store } from 'core';
import { withRouter, withStore } from 'helpers';

import './chat.scss';

type ChatPageProps = {
  router: CoreRouter;
  store: Store<AppState>;
};

export class ChatPage extends Block<ChatPageProps> {
  static componentName = 'Чат';

  constructor(props: ChatPageProps) {
    super(props);
  };

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
      </div>
    `;
  }
}

export default withRouter(withStore(ChatPage));
