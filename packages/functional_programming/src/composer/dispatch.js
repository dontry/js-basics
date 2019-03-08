const construct = require("../construct");
const existy = require("../existy");

function dispatch(/* funcs */) {
  const funcs = Array.from(arguments);
  const size = funcs.length;

  return function(target, ...args /* args */) {
    let ret = undefined;

    for (let funcIndex = 0; funcIndex < size; funcIndex++) {
      const func = funcs[funcIndex];
      ret = func.apply(func, construct(target, args));

      if (existy(ret)) return ret;
    }
    return ret;
  };
}

module.exports = dispatch;
