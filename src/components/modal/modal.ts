import Block from 'core/Block';

import './modal.scss';

interface ModalProps {
  title: string;
}

export class Modal extends Block<ModalProps> {
  static componentName = 'Modal';

  constructor({ title }: ModalProps) {
    super({
      title
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="modal">
        <h1 class="modal__title">{{title}}</h1>
        <div class="modal__body" data-layout=1>
        </div>
      </div>
    `;
  }
}
