export interface CoreRouter {
  start(): void

  use(path: string, callback: () => void): CoreRouter

  getPath(path: string): string

  go(path: string): void

  back(): void

  forward(): void
}
