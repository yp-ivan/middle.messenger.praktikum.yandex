import { BlockClass, Store } from 'core/index';
import isEqual from 'helpers/utils/isEqual';

type WithStateProps = { store: Store<AppState> };

type MapStateToProps<S> = (state: AppState) => S;

export const withStore = <P extends WithStateProps, S = any>(WrappedBlock: BlockClass<P>, mapStateToProps?: MapStateToProps<S>) => {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, store: window.store });
    }

    __onChangeStoreCallback = (prev: AppState, next: AppState) => {
      if (typeof mapStateToProps === 'function') {
        const prevPropsFromState = mapStateToProps(prev);
        const nextPropsFromState = mapStateToProps(next);

        // @ts-ignore
        if (isEqual(prevPropsFromState, nextPropsFromState)) {
          return;
        }

        // @ts-expect-error this is not typed
        this.setProps(nextPropsFromState);
      }

      // @ts-expect-error this is not typed
      this.setProps({ ...this.props, store: window.store });
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on('changed', this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off('changed', this.__onChangeStoreCallback);
    }
  } as BlockClass<Omit<P, 'store'>>;
};
