import { BlockClass } from 'core';
import { WSTransport } from 'helpers/WSTransport';

type WithWSProps = { ws: WSTransport };

export function withWS <P extends WithWSProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, ws: window.ws });
    }
  } as BlockClass<Omit<P, 'ws'>>;
}
