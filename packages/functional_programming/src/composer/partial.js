const cat = require("../cat");
const construct = require("../construct");

function partial(func, ...partialArgs) {
  return function() {
    const args = cat(partialArgs, Array.from(arguments));
    return func.apply(func, args);
  };
}

function partial1(func, arg1) {
  return function() {
    const args = construct(arg1, arguments);
    return func.apply(func, args);
  };
}

function partial2(func, arg1, arg2) {
  return function() {
    const args = cat([arg1, arg2], arguments);
    return func.apply(func, args);
  };
}

module.exports = { partial, partial1, partial2 };
