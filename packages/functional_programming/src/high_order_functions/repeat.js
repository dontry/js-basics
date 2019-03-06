const _ = require("lodash");
//iterateUtil
// use function not value
function repeat(times, func) {
  return _.map(_.range(times), func);
}

module.exports = repeat;
