import Block from 'core/Block';

import './errorBox.scss';

interface ErrorBoxProps {
  code: string;
  text: string;
}

export class ErrorBox extends Block {
  static componentName = 'ErrorBox';

  constructor({ code, text }: ErrorBoxProps) {
    super({
      code,
      text
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="error-box">
        <h1 class="error__title">{{code}}</h1>
        <p class="error__text">{{text}}</p>
        <div class="error__link-back">
          {{{Link text="Назад к чатам" to="/index"}}}
        </div>
      </div>
    `;
  }
}
