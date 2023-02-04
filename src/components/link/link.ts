import Block from 'core/Block';

import './link.scss';

interface LinkProps {
  text: string;
  to: string;
}

export class Link extends Block {
  static componentName = 'Link';

  constructor(props: LinkProps) {
    const onClick = (e: MouseEvent) => {
      console.log('Click');
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
    return `<a href="{{to}}">{{text}}</a>`;
  }
}
