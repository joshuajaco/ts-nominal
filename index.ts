declare const OpaqueIdentifier: unique symbol;
type Opaque<T extends symbol> = { readonly [OpaqueIdentifier]: T };

export type Nominal<T, U extends symbol> = 0 extends 1 & T
  ? never
  : T & Opaque<U>;

type NoInfer<T> = [T][T extends any ? 0 : never];

export function nominal<T extends Opaque<any> = never>(
  value: 0 extends 1 & T
    ? never
    : T extends infer V & Opaque<T[typeof OpaqueIdentifier]>
    ? V
    : never
): NoInfer<T> {
  return value as any;
}
