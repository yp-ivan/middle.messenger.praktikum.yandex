import Handlebars, { HelperOptions } from 'handlebars';
import Block from './Block';

interface BlockConstructable<Props> {
  new(props: Props): Block;
  componentName: string;
}

const registerComponent = <Props extends Indexed>(Component: BlockConstructable<Props>) => {
  Handlebars.registerHelper(
    Component.componentName,
    function (this: Props, { hash: { ref, ...hash }, data, fn }: HelperOptions) {
      let { children = {}, refs = {} } = data.root;

      if (!children) children = {};
      if (!refs) refs = {};

      /**
       * Костыль для того, чтобы передавать переменные
       * внутрь блоков вручную подменяя значение
       */
      (Object.keys(hash) as any).forEach((key: keyof Props) => {
        if (this[key] && typeof this[key] === 'string') {
          hash[key] = hash[key].replace(new RegExp(`{{${key as string}}}`, 'i'), this[key]);
        }
      });

      const component = new Component(hash);

      children[component.id] = component;

      if (ref) {
        refs[ref] = component;
      }

      const contents = fn ? fn(this) : '';

      return `<div data-id="${component.id}">${contents}</div>`;
    }
  );
};

export default registerComponent;
