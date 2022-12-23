declare const BrandIdentifier: unique symbol;
type Brand<T extends symbol> = { readonly [BrandIdentifier]: T };

export type Nominal<T, U extends symbol> = 0 extends 1 & T
  ? never
  : T & Brand<U>;

type NoInfer<T> = [T][T extends any ? 0 : never];

export function nominal<T extends Brand<any> = never>(
  value: 0 extends 1 & T
    ? never
    : T extends infer V & Brand<T[typeof BrandIdentifier]>
    ? V
    : never
): NoInfer<T> {
  return value as any;
}
