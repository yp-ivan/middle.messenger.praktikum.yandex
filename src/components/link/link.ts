import Block from 'core/Block';

import './link.scss';

interface LinkBaseProps {
  text: string;
  to: string;
  className?: string;
}

interface LinkProps extends LinkBaseProps {
  onClick?: FuncProp
}
interface LinkSuperProps extends LinkBaseProps {
  events: {
    click?: FuncProp
  }
}

export class Link extends Block<LinkProps> {
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
    } as LinkSuperProps);
  }

  render() {
    // language=hbs
    return `<a href="{{to}}" class="{{className}}">{{text}}</a>`;
  }
}
