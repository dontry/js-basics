const _ = require("lodash");
function complement(predicate) {
  return function() {
    return !predicate.apply(null, _.toArray(arguments));
  };
}

module.exports = complement;
