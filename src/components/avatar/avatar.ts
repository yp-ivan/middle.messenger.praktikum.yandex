import Block from 'core/Block';

import './avatar.scss';

interface AvatarProps {
  url?: string;
  className?: string;
}

export class Avatar extends Block {
  static componentName = 'Avatar';

  constructor(props: AvatarProps) {
    super({
      ...props
    });
  }

  render() {
    // language=hbs
    return `<div class="avatar {{className}}" {{#if url}}style="background-image: url('{{url}}')"{{/if}}></div>`;
  }
}
