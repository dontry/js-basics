import "reflect-metadata";
// class decorator
function addAge(constructor: Function) {
  constructor.prototype.age = 18;
}

@addAge
class Person1 {
  name: string;
  age: number;
  constructor() {
    this.name = "john";
  }
}

let person = new Person1();

console.log(person.age);

// property/method decorator
function method(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log(target);
  console.log("prop:" + propertyKey);
  console.log("desc:" + JSON.stringify(descriptor, null, 2));
  descriptor.writable = false;
  console.log("desc:" + JSON.stringify(descriptor, null, 2));
}

class Person2 {
  name: string;
  constructor() {
    this.name = "josh";
  }

  /**
   * say
   */
  @method
  public say() {
    return "instance method";
  }

  @method
  public static say() {
    return "static method";
  }
}

const josh = new Person2();

try {
  josh.say = function() {
    return "edit";
  };
} catch (e) {
  console.log(e.message);
}

// argument decorators
// target: prototype of the object, propertyKey: argument's name, index: position of the argument
function logParameter(target: Object, propertyKey: string, index: number) {
  console.log(target, propertyKey, index);
}

class Person3 {
  greet(@logParameter message: string, @logParameter name: string): string {
    return `${message} ${name}`;
  }
}

const p = new Person3();
console.log(p.greet("hello", "jack"));

// decorator factory
function log(...args: any[]) {
  switch (args.length) {
    case 1:
      return logClass.apply(this, args);
    case 3:
      if (typeof args[2] === "number") {
        return logArgument.apply(this, args);
      } else if (typeof args[2] === "undefined") {
        return logProperty.apply(this, args);
      } else {
        return logMethod.apply(this, args);
      }
    default:
      throw new Error("Decorators are not valid here!");
  }
}

function logClass(target: typeof Person) {
  console.log(target);
}

function logProperty(target: any, propertyKey: string) {
  console.log(propertyKey);
}

function logMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log(`${propertyKey}: ${JSON.stringify(descriptor)}`);
}

function logArgument(target: Object, propertyKey: string, index: number) {
  console.log(index);
}

@log
class Car {
  @log
  model: string;
  constructor(@log _model: string) {
    this.model = _model;
  }

  @log
  run() {
    return "zoom";
  }
}

const newCar = new Car("toyota");
newCar.run();

// Order of decorator
// get the returned function from top to down
// execute the returned function from down to top;

//Reflect metadata
@Reflect.metadata("name", "A")
class A {
  @Reflect.metadata("hello", "world")
  public say(): string {
    return "hello world";
  }

  @Reflect.metadata("hello", "guys")
  public static greet(name: string): string {
    return "hello" + name;
  }
}

let g = new A();

console.log(Reflect.getMetadata("name", A)); // 'A'
console.log(Reflect.getMetadata("hello", A, "greet")); // 'guys'
console.log(Reflect.getMetadata("hello", g, "say")); // 'world'
console.log(Reflect.getMetadata("design:type", new A(), "say"));
console.log(Reflect.getMetadata("design:paramtypes", A, "greet"));
console.log(Reflect.getMetadata("design:returntype", A, "greet"));

const METHOD_METADATA = "method";
const PATH_METADATA = "path";
// decorator factory method;
const Controller = (path: string): ClassDecorator => {
  return target => {
    Reflect.defineMetadata(PATH_METADATA, path, target);
  };
};

const createMappingDecorator = (method: string) => (
  path: string
): MethodDecorator => {
  return (target, key, descriptor) => {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value!);
    Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value!);
  };
};

const Get = createMappingDecorator("GET");
const Post = createMappingDecorator("POST");

@Controller("/article")
class Home {
  @Get("/content")
  someGetMethod() {
    return "hello world";
  }

  @Post("/comment")
  somePostMethod() {}
}
function mapRoute(instance: Object) {
  const prototype = Object.getPrototypeOf(instance);

  // filter methodName
  const methodsNames = Object.getOwnPropertyNames(prototype).filter(
    item => item !== "constructor" && typeof prototype[item] === "function"
  );
  return methodsNames.map(methodName => {
    const fn = prototype[methodName];

    // extract metadata
    const path = Reflect.getMetadata(PATH_METADATA, fn);
    const method = Reflect.getMetadata(METHOD_METADATA, fn);
    return {
      path,
      method,
      fn,
      methodName
    };
  });
}

Reflect.getMetadata(PATH_METADATA, Home);

const info = mapRoute(new Home());

console.log(info);
