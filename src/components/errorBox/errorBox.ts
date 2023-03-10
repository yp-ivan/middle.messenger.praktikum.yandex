import Block from 'core/Block';

import './errorBox.scss';

interface ErrorBoxProps {
  code: string;
  text: string;
}

export class ErrorBox extends Block<ErrorBoxProps> {
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
          {{{Link text="На карту сайта" to="map"}}}
        </div>
      </div>
    `;
  }
}
