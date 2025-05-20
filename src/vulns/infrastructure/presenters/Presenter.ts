export interface Presenter<T, K> {
  present: (client: T) => K;
}