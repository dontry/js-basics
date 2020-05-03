/*
  The operation of curry can be summarized as follows:
   - Take a function
   - Returns a function expecting one parameter
*/

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
