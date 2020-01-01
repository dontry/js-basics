//infer 关键字就是声明一个类型变量,当类型系统给足条件的时候类型就会被推断出来.

type constructorParameters<
  T extends new (...args: any[]) => any
> = T extends new (...args: infer P) => any ? P : never;

class TestClass {
  constructor(public name: string, public age: number) {}
}

type R11 = constructorParameters<typeof TestClass>;

type ElementOf<T> = T extends Array<infer E> ? E : never;

type TTuple = [string, number];

type ToUnion = ElementOf<TTuple>; // string | number
