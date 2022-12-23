declare const OpaqueIdentifier: unique symbol;
type Opaque<T extends symbol> = { readonly [OpaqueIdentifier]: T };

export type Nominal<T, U extends symbol> = T & Opaque<U>;

type NoInfer<T> = [T][T extends any ? 0 : never];

export function nominal<T extends Opaque<any> = never>(
  value: T extends infer V & Opaque<T[typeof OpaqueIdentifier]> ? V : never
): NoInfer<T> {
  return value as T;
}
