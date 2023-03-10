import Block from 'core/Block';

import './button.scss';

type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonBaseProps {
  text: string;
  className?: string;
  type: ButtonType;
}

interface ButtonProps extends ButtonBaseProps {
  onClick?: (e: Event) => void;
}

interface ButtonSuperProps extends ButtonBaseProps {
  events: {
    click?: (e: Event) => void;
  }
}

export class Button extends Block<ButtonProps> {
  static componentName = 'Button';

  constructor({ text, className, type, onClick }: ButtonProps) {
    super({
      text,
      type,
      className,
      events: {
        click: onClick
      }
    } as ButtonSuperProps);
  }

  protected render(): string {
    // language=hbs
    return `
      <button class="btn {{className}}" type="{{type}}">{{text}}</button>
    `;
  }
}
