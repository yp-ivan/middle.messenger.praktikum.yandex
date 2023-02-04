import Block from 'core/Block';

import './link.scss';

interface LinkProps {
  text: string;
  to: string;
  className?: string;
}

export class Link extends Block {
  static componentName = 'Link';

  constructor(props: LinkProps) {
    const onClick = (e: MouseEvent) => {
      console.log(props.to);
      window.location.href = './';
      e.preventDefault();
    };

    super({
      ...props,
      events: {
        click: onClick
      }
    });
  }

  render() {
    // language=hbs
    return `<a href="{{to}}" class="{{className}}">{{text}}</a>`;
  }
}
