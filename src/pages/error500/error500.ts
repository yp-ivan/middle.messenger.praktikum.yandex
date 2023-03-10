import Block from 'core/Block';

export class Error500Page extends Block {
  static componentName = 'Ошибка 500';
  render() {
    // language=hbs
    return `
      <div class="fbox">
        {{{ErrorBox code="500" text="Мы уже фиксим"}}}
      </div>
    `;
  }
}
