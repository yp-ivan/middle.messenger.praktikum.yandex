import { renderDOM } from 'core';
import Block from 'core/Block';

import Error404Page from 'pages/error404';
import Error500Page from 'pages/error500';

export class HomePage extends Block {
  constructor() {
    super();
    this.setProps({
      openError404Page: (e: FocusEvent) => {
        e.preventDefault();
        renderDOM(new Error404Page());
      },
      openError500Page: (e: FocusEvent) => {
        e.preventDefault();
        renderDOM(new Error500Page());
      }
    });
  }

  render() {
    // language=hbs
    return `
      {{#Modal title="Навигация по страницам" }}
        {{{Button text="Ошибка 404" className="btn_primary w-100" link="/error404" onClick=openError404Page}}}
        <br><br>
        {{{Button text="Ошибка 500" className="btn_primary w-100" link="/error500" onClick=openError500Page}}}
      {{/Modal}}
    `;
  }
}
