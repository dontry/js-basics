const _ = require("lodash");
const existy = require("../existy");

/* 
  Takes a method and returns a function
  that will invoke that method on any object given
 */
function invoker(name, method) {
  return function(target) {
    if (!existy(target)) throw new Error("Must provide a target");

    const targetMethod = target[name];
    const args = _.tail(arguments);

    if (existy(targetMethod) && method === targetMethod) {
      return targetMethod.apply(target, args);
    }
  };
}

module.exports = invoker;
