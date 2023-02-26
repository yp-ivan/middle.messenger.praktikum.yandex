import { Block, CoreRouter } from 'core';
import { withRouter } from 'helpers';

import './link.scss';

interface LinkBaseProps {
  router: CoreRouter;
  text: string;
  to: string;
  href?: string;
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

class Link extends Block<LinkProps> {
  static componentName = 'Link';

  constructor(props: LinkProps) {
    const onClick = (e: MouseEvent) => {
      props.router.go(props.to);
      e.preventDefault();
    };
    const href = props.router.getPath(props.to);

    super({
      ...props,
      href,
      events: {
        click: onClick
      }
    } as LinkSuperProps);
  }

  render() {
    // language=hbs
    return `<a href="{{href}}" class="{{className}}">{{text}}</a>`;
  }
}

export default withRouter(Link);
