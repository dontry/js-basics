const _ = require("lodash");
const existy = require("../existy");

function fnull(func, ...defaults) {
  return (...args) => {
    args = _.map(args, (e, i) => {
      return existy(e) ? e : defaults[i];
    });
    return func.apply(null, args);
  };
}

module.exports = fnull;
