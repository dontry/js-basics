const _ = require("lodash");

/**
 * a flat recursive function * from func(x)()() to trampoline(x)
 *
 * @param {*} func
 * @param {*} args
 * @returns {*} result
 */
function trampoline(func, ...args) {
  let result = func.apply(func, args);

  while (_.isFunction(result)) {
    result = result();
  }
  return result;
}

module.exports = trampoline;
