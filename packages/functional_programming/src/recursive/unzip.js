const _ = require("lodash");
const constructPair = require("./constructPair");
/**
 * [1,2], [3,4],[5,6] => [1,2,3], [4,5,6]
 *
 *
 * @param {*} pairs
 * @returns
 */
function unzip(pairs) {
  if (_.isEmpty(pairs)) return [[], []];

  return constructPair(_.head(pairs), unzip(_.tail(pairs)));
}

module.exports = unzip;
