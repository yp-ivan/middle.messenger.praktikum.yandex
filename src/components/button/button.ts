import Block from 'core/Block';

import './button.scss';

type ButtonTypes = 'button' | 'submit' | 'reset';

interface ButtonProps {
  text: string;
  className?: string;
  type: ButtonTypes,
  onClick: () => void;
}

export class Button extends Block {
  static componentName = 'Button';

  constructor({ text, className, type, onClick }: ButtonProps) {
    super({
      text,
      type,
      className,
      events: {
        click: onClick
      }
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <button class="btn {{className}}" type="{{type}}">{{text}}</button>
    `;
  }
}
