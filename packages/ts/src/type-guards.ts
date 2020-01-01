interface Person {
  name: string;
  age: number;
}

interface Animal {
  name: string;
  color: string;
}

function doSomething(arg: Person | Animal) {
  if (arg instanceof Animal) {
    console.log(arg.color);
  }

  if (arg instanceof Person) {
    console.log(arg.age);
  }
}

// literal guard type
type Foo1 = {
  kind: "foo";
  foo: number;
};

type Bar1 = {
  kind: "bar";
  bar: number;
};

function doStuff(arg: Foo1 | Bar1) {
  if (arg.kind === "foo") {
    console.log(arg.foo);
  } else {
    console.log(arg.bar);
  }
}
