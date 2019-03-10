const _ = require("lodash");
const construct = require("../construct");

// _.extend mutates first argument
// merge create a new object by merging all arguments
function merge() {
  return _.extend.apply(null, construct({}, arguments));
}

module.exports = merge;
