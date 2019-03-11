const _ = require("lodash");
const constructPair = require("./constructPair");
function unzip(pairs) {
  if (_.isEmpty(pairs)) return [[], []];

  return constructPair(_.head(pairs), unzip(_.tail(pairs)));
}

module.exports = unzip;
