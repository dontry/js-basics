const _ = require("lodash");
//a global lookup table
let globals = {};

function makeBindFun(resolver) {
  return function(k, v) {
    let stack = globals[k] || [];
    globals[k] = resolver(stack, v);
    return globals;
  };
}

const stackBinder = makeBindFun(function(stack, v) {
  stack.push(v);
  return stack;
});

const stackUnbinder = makeBindFun(function(stack) {
  stack.pop();
  return stack;
});

const dynamicLookup = function(k) {
  const slot = globals[k] || [];
  return _.last(slot);
};

const a = stackBinder("a", 1);
a;
const b = stackBinder("b", 100);
b;

const res = dynamicLookup("a");

const a1 = stackBinder("a", "*");
a1;
res;
globals;

//The problem of dynamic scope is you never know the value of binding variable before calling the function

//Javascript dynamic scope is to use 'this'
function globalThis() {
  return this;
}

const target = {
  name: "value",
  aux: function() {
    return this.name;
  },
  act: function() {
    return this.aux();
  }
};

// target.act.call("wat");
//  Binds a number of methods on the object, specified by methodNames, to be run in the context of that object whenever they are invoked.
//Very handy for binding functions that are going to be used as event handlers,
//which would otherwise be invoked with a fairly useless this. methodNames are required.
_.bindAll(target, "aux", "act");

const x = target.act.call("wat");
x;
