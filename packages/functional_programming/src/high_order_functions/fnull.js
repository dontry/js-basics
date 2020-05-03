const _ = require("lodash");
const existy = require("../existy");

/* 
  Checks its incoming arguments for null or undefined,
  fills in the original defaults if either is found,
  and then calls the original with the patched args.
 */
function fnull(func, ...defaults) {
  return (...args) => {
    args = _.map(args, (e, i) => {
      return existy(e) ? e : defaults[i];
    });
    return func.apply(null, args);
  };
}

module.exports = fnull;
