# ts-nominal

Nominal typing in TypeScript.

## Installation

```sh
# npm
npm install ts-nominal

# yarn
yarn add ts-nominal

# pnpm
pnpm install ts-nominal
```

## Usage

### `Nominal<T, U>`

Create a nominal type from any type `T` using the unique symbol `U`.

#### Example

```ts
import type { Nominal } from "ts-nominal";

declare const __FOO_STRING_ID: unique symbol;
type FooString = Nominal<string, typeof __FOO_STRING_ID>;

declare let foo: FooString;
declare let fooLike: string;

// 'FooString' can be assigned to type 'string'
fooLike = foo;

// 'string' cannot be assigned to type 'FooString'
foo = fooLike; // Error: Type 'string' is not assignable to type 'FooString'.

// casting still works
foo = fooLike as FooString;
```

### `nominal<T>(value)`

Cast `value` to the nominal type `T`. Equivalent to `value as T`, but with autocompletion for `value`.  
It does not modify `value` in any way and has essentially no overhead on the resulting JavaScript (transpiles to `(value) => value`).

#### Example

```ts
import { type Nominal, nominal } from "ts-nominal";

declare const __FOO_STRING_ID: unique symbol;
type FooString = Nominal<string, typeof __FOO_STRING_ID>;

const foo: FooString = nominal<FooString>("foo");

// create a factory by only providing the type argument
const createFoo = nominal<FooString>;
const foo2 = createFoo("foo2");

// comparisons still function as usual
foo === "foo"; // true
foo === "bar"; // false
```

## License

[MIT](https://github.com/joshuajaco/ts-nominal/blob/main/LICENSE)
