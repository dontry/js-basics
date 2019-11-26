let target = {};

let proxy = new Proxy(target, {});

proxy;
// writing op, proxy.test = sets the value on target
proxy.test = 5;

// there are no traps, all operations on proxy are forwarded to target
// reading operation proxy.test returns the value from target
// without any traps, proxy is a transparent wrapper around target
console.log(target.test);

// [[Set]] must return true if the value was written successfully, otherwise false
// [[Delete]] must return true if successful, otherwise return false
// [[GetPrototypeOf]] reading a prototype of a proxy must always return the prototype of the target object

// target: the one passed as the 1st argument to new Proxy
// property - property name
// receiver: usually its the proxy object.

let numbers = [0, 1, 2];

// Get trap
numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      // return target[prop];
      return Reflect.get(...arguments);
    } else {
      return 0;
    }
  },
  set(target, prop, val) {
    if (typeof val === "number") {
      target[prop] = val;
      return true; // must return a boolean
    } else {
      return false;
    }
  }
});

console.log(numbers[1]);
console.log(numbers[123]);
numbers.push(1);

// Iteration with "ownKeys" and "getOwnPropertyDescriptor"
let user = {
  name: "John",
  age: 30,
  sex: "male",
  pin: "ggg",
  _password: "***"
};

Object.defineProperty(user, "pin", {
  enumerable: false
});

user = new Proxy(user, {
  ownKeys(target) {
    return Object.keys(target).filter(key => !key.startsWith("_"));
  }
});

console.log(Object.keys(user));
console.log(Object.values(user));

// if we return a key that doesn't exist in the object, Object.keys won't list it;
// because it only returns properties with the enumerable flag is true

user = new Proxy(user, {
  ownKeys(target) {
    return ["a", "b", "c"];
  },
  getOwnPropertyDescriptor(target, prop) {
    return {
      enumerable: true,
      configurable: true
    };
  }
});

console.log(Object.keys(user));

// private property

let user2 = {
  name: "John",
  _password: "***",
  checkPassword(value) {
    return value === this._password;
  }
};

user2 = new Proxy(user2, {
  get(target, prop) {
    if (prop.startsWith("_")) {
      throw new Error("Access denied");
    }
    let value = target[prop];
    // such as user.checkPassword(), must be able to access _password:
    //A call to user.checkPassword() call gets proxied user as this (the object before dot becomes this), so when it tries to access this._password, the get trap activates (it triggers on any property read) and throws an error.
    //So we bind the context of object methods to the original object, target, in the line (*). Then their future calls will use target as this, without any traps.
    return typeof value === "function" ? value.bind(target) : value;
  },
  set(target, prop, val) {
    if (prop.startsWith("_")) {
      throw new Error("Access denied");
    } else {
      Reflect.set(...arguments);
      return true;
    }
  },
  deleteProperty(target, prop) {
    if (prop.startsWith("_")) {
      throw new Error("Access denied");
    } else {
      Reflect.deleteProperty(...arguments);
      return true;
    }
  },
  ownKeys(target) {
    return Object.keys(target).filter(key => !key.startsWith("_"));
  }
});

try {
  console.log(user2._password);
} catch (e) {
  console.error(e);
}

try {
  user2._password = "xxx";
} catch (e) {
  console.error(e);
}

try {
  delete user2._password;
} catch (e) {
  console.error(e);
}

console.log(user2.checkPassword("***"));

// Proxy forwards everything to the target object
function delay(f, ms) {
  return new Proxy(f, {
    apply(target, thisArg, args) {
      setTimeout(() => target.apply(thisArg, args), ms);
    }
  });
}

function sayHi(user) {
  console.log(`Hello, ${user}!`);
}

sayHi = delay(sayHi, 3000);

// 1 (*) proxy forwards "get length" operation to the target
console.log(sayHi.length);

sayHi("John");

// In particular, Reflect allows us to call operators (new, delete…) as functions (Reflect.construct, Reflect.deleteProperty, …).
// That’s an interesting capability, but here another thing is important.
// For every internal method, trappable by Proxy, there’s a corresponding method in Reflect, with the same name and arguments as Proxy trap.
let user3 = {
  _name: "Pete",
  get name() {
    return this._name;
  }
};

user3 = new Proxy(user3, {
  get(target, prop, receiver) {
    console.log(`GET ${prop}`);
    return Reflect.get(target, prop, receiver); // (1)
  },
  set(target, prop, val, receiver) {
    console.log(`SET ${prop}=${val}`);
    return Reflect.set(target, prop, val, receiver); // (2)
  }
});

let name = user3.name; // shows "GET name"
console.log(name);
user3.name = "John"; // shows "SET name=Pete"

let user4 = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};
//The Reflect API is designed to complement Proxy. For any Proxy trap, there’s a Reflect call with same arguments.
//we should use those to forward calls to target objects.
//receiver keeps the correct this to be passed to a getter. In our case that’s admin.
let userProxy = new Proxy(user4, {
  get(target, prop, receiver) {
    // receiver = admin
    return Reflect.get(target, prop, receiver); // (*)
  }
});

let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

console.log(admin.name); // Admin

//Revocable proxies
//A revocable proxy is a proxy that can be disabled.
let revokes = new WeakMap();

let object = {
  data: "Valuable data"
};

let { proxy: proxy1, revoke } = Proxy.revocable(object, {});

revokes.set(proxy1, revoke);

// ..later in our code..
revoke = revokes.get(proxy1);
revoke();

console.log(proxy.data); // Error (revoked)
