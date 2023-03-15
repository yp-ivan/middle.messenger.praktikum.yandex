import { MockedPathRouter } from 'tests/MockedPathRouter';

Object.defineProperty(window, 'location', {
  value: new URL('http://localhost')
});

describe('core/Router/PathRouter', () => {
  test('Router go', () => {
    const router = new MockedPathRouter();
    router.go('sign-up');
    expect(router.getPath('sign-up')).toEqual('/sign-up');
    expect(window.location.pathname).toEqual('/sign-up');
  });
  test('Router back', () => {
    const router = new MockedPathRouter();
    router.go('sign-up');
    setTimeout(() => {
      router.back();
      expect(window.location.pathname).toBe('');
    }, 100);
  });
  test('Router forward', () => {
    const router = new MockedPathRouter();
    router.go('sign-up');
    setTimeout(router.back, 100);
    setTimeout(() => {
      router.forward();
      expect(window.location.pathname).toBe('sign-up');
    }, 200);
  });
  test('Router use', () => {
    const router = new MockedPathRouter();
    const mock = jest.fn();
    router.use('use', mock);
    router.go('use');
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
