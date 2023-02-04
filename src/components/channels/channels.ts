import Block from 'core/Block';

import channels from 'data/channels.json';
import { ChannelsItemProps } from './channelsItem';

import './channels.scss';

interface ChannelsProps {
  text: string;
  to: string;
  className?: string;
}

export class Channels extends Block {
  static componentName = 'Channels';

  constructor(props: ChannelsProps) {
    super({
      ...props
    });
  }

  render() {
    // language=hbs
    return `
      <div class="channels-list">
        <div class="channel-sep"></div>
        ${(channels.data as ChannelsItemProps[]).map((channel) => `
          {{{ChannelsItem
            name="${channel.name}"
            avatar="${channel.avatar || ''}"
            teaser="${channel.teaser}"
            updated="${channel.updated}"
            unread=${channel.unread}
            active=${channel.active}
          }}}`).join('')}
      </div>
    `;
  }
}
