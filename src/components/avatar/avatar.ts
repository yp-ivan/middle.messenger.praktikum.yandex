import Block from 'core/Block';
import { config } from 'data/config';

import './avatar.scss';

interface AvatarProps {
  url?: string;
  className?: string;
  fullUrl?: () => string;
}

export class Avatar extends Block<AvatarProps> {
  static componentName = 'Avatar';

  static baseUrl = config.apiResources;

  constructor(props: AvatarProps) {
    super(props);
    this.setProps({
      fullUrl: () => (this.props.url ? `${Avatar.baseUrl}${this.props.url}` : '')
    });
  }

  render() {
    // language=hbs
    return `
      <div class="avatar {{className}}"
           {{#if fullUrl}}style="background-image: url('{{fullUrl}}')"{{/if}}
      ></div>
    `;
  }
}
