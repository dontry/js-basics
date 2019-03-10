function curry(func) {
  return function(arg) {
    return func(arg);
  };
}

function curry2(func) {
  return function(secondArg) {
    return function(firstArg) {
      return func(firstArg, secondArg);
    };
  };
}

module.exports = {
  curry,
  curry2
};
