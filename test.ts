import { expectType, TypeEqual } from "ts-expect";
import { nominal, Nominal } from "./index";
import assert from "assert";

declare const FOO: unique symbol;
type FooString = Nominal<string, typeof FOO>;
const createFoo = nominal<FooString>;

declare const BAR: unique symbol;
type BarString = Nominal<string, typeof BAR>;
const createBar = nominal<BarString>;

function fooFn(_: FooString) {}
function barFn(_: BarString) {}

const fooString = createFoo("");
const barString = createBar("");

fooFn(fooString);
barFn(barString);
fooFn(createFoo(""));
barFn(createBar(""));
fooFn(nominal<FooString>(""));
barFn(nominal<BarString>(""));

assert.strictEqual(nominal<FooString>("foo"), "foo");

type Foo = Nominal<{ foo: string }, typeof FOO>;
const foo = { foo: "bar" };
assert.strictEqual(nominal<Nominal<Foo, typeof FOO>>(foo), foo);

expectType<(_: string) => FooString>(nominal<FooString>);

// @ts-expect-error
nominal<FooString>(1);
// @ts-expect-error
nominal<BarString>(1);
// @ts-expect-error
fooFn(barString);
// @ts-expect-error
barFn(fooString);
// @ts-expect-error
fooFn("");
// @ts-expect-error
barFn("");
// @ts-expect-error
fooFn(nominal(""));
// @ts-expect-error
barFn(nominal(""));
// @ts-expect-error
createFoo(1);
// @ts-expect-error
fooFn(barString);

// @ts-expect-error
nominal();
// @ts-expect-error
nominal(0);
// @ts-expect-error
nominal<any>(0);
// @ts-expect-error
nominal<unknown>(0);
// @ts-expect-error
nominal<never>(0);

expectType<TypeEqual<typeof nominal<never>, (_: never) => never>>(true);
expectType<TypeEqual<Parameters<typeof nominal>, never>>(true);
expectType<TypeEqual<Nominal<any, any>, never>>(true);
