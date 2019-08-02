type Foo = {
  bar: number;
  bas: number;
};

type FooReadonly = Readonly<Foo>;

let foo: Foo = { bar: 123, bas: 456 };
let fooReadonly: FooReadonly = { bar: 123, bas: 456 };

foo.bar = 456; // Okay

// fooReadonly.bar = 456; // ERROR: bar is readonly

/**
 * Declaration
 */
interface Bar {
  readonly [x: number]: number;
}

/**
 * Usage
 */
let bar: Bar = { 0: 123, 2: 345 };
console.log(bar[0]); // Okay (reading)
//bar[0] = 456; // Error (mutating): Readonly

let foo1: ReadonlyArray<number> = [1, 2, 3];
console.log(foo1[0]); // Okay
// foo1.push(4); // Error: `push` does not exist on ReadonlyArray as it mutates the array
foo1 = foo1.concat([4]); // Okay: create a copy
