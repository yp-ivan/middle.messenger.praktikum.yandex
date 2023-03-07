import Block from 'core/Block';

import './avatar.scss';

interface AvatarProps {
  url?: string;
  className?: string;
  fullUrl?: () => string;
}

export class Avatar extends Block<AvatarProps> {
  static componentName = 'Avatar';

  static baseUrl = 'https://ya-praktikum.tech/api/v2/resources';

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
