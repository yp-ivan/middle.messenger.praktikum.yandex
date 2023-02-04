import Block from 'core/Block';

export class Error500Page extends Block {
  render() {
    // language=hbs
    return `
      <div class="fbox">
        {{{ErrorBox code="500" text="Мы уже фиксим"}}}
      </div>
    `;
  }
}
