import Block from 'core/Block';

export class Error404Page extends Block {
  static componentName = 'Ошибка 404';
  render() {
    // language=hbs
    return `
      <div class="fbox">
        {{{ErrorBox code="404" text="Не туда попали"}}}
      </div>
    `;
  }
}
