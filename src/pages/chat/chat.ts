import Block from 'core/Block';

import './chat.scss';

export class ChatPage extends Block {
  render() {
    // language=hbs
    return `
      <div class="fbox">

        <aside class="chat__channels">

          <div>
            <div class="profile-link">
              {{{Link text="Профиль →" to="/profile"}}}
            </div>

            <form class="form_channels-search">
              <div class="form-group">
                <input type="search" name="search" class="form-control_search" placeholder="Поиск" required>
              </div>
            </form>
          </div>

          {{{Channels}}}

        </aside>

        <main class="chat__messages">

          {{#if channelSelected}}

            <div class="no-messages">Выберите чат, чтобы отправить сообщение</div>

          {{else}}

            <div class="chat__profile">
              {{{Avatar url="https://i.stack.imgur.com/N8fPi.jpg?s=64&g=1" className="chat__profile__avatar"}}}
              <div class="chat__profile__name">Петр</div>
            </div>

            {{{Messages}}}

            <div class="chat__send-message">
              <form class="form_send-message">
                <input type="text" name="message" class="form-control_message" placeholder="Сообщение">
                <button type="submit" class="btn_send-message"></button>
              </form>
            </div>

          {{/if}}

        </main>

      </div>
    `;
  }
}
