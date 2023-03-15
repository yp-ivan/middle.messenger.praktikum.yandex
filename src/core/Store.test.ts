import { Store } from './Store';

describe('core/Store', () => {
  it('should set state', () => {
    const store = new Store({});

    store.set({ userId: 123 });

    expect(store.getState()).toEqual({ userId: 123 });
    // @ts-expect-error check private field
    expect(store.state).toEqual({ userId: 123 });
  });

  it('should emit event after store was update', () => {
    const store = new Store({ userId: -1 });
    const mock = jest.fn();

    store.on('changed', mock);

    store.set({ userId: 123 });

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith({ userId: -1 }, { userId: 123 });
  });

  it('should dispatch next state', () => {
    const store = new Store({ userId: -1 });

    store.dispatch({ userId: 0 });

    expect(store.getState()).toEqual({ userId: 0 });
  });

  it('should dispatch action', () => {
    const store = new Store({ userId: -1 });
    const mock = jest.fn();

    store.dispatch(mock, { userId: 0 });

    expect(mock).toHaveBeenCalledTimes(1);
    // first param is store.dispatch.bind(this)
    expect(mock).toHaveBeenCalledWith(expect.anything(), { userId: -1 }, { userId: 0 });
  });
});
