import Block from 'core/Block';

import './channelsItem.scss';

export interface ChannelsItemProps {
  name: string;
  avatar?: string;
  teaser: string;
  updated: string;
  unread?: number;
  active?: boolean;
}

export class ChannelsItem extends Block {
  static componentName = 'ChannelsItem';

  constructor(props: ChannelsItemProps) {
    super({
      ...props
    });
  }

  render() {
    // language=hbs
    return `
      <article class="channel-item {{#if active}}active{{/if}}">
        <div class="channel-item__left">
          {{{Avatar url=avatar className="channel-item__avatar"}}}
        </div>
        <div class="channel-item__right">
          <div class="channel-item__header">
            <h3 class="channel-item__title">{{name}}</h3>
            <div class="channel-item__date">{{updated}}</div>
          </div>
          <div class="channel-item__body">
            <div class="channel-item__text">{{teaser}}</div>
            <div class="channel-item__count">
              {{#if unread}}
                <span class="channel-item__cnt">{{unread}}</span>
              {{/if}}
            </div>
          </div>
        </div>
      </article>
    `;
  }
}
