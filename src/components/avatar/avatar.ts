import Block from 'core/Block';

import './avatar.scss';

interface AvatarProps {
  url?: string;
  className?: string;
}

export class Avatar extends Block<AvatarProps> {
  static componentName = 'Avatar';

  static baseUrl = 'https://ya-praktikum.tech/api/v2/resources';

  constructor(props: AvatarProps) {
    super({
      ...props
    });
  }

  render() {
    // language=hbs
    return `
      <div class="avatar {{className}}"
           {{#if url}}style="background-image: url('${Avatar.baseUrl}{{url}}')"{{/if}}
      ></div>
    `;
  }
}
