const _ = require("lodash");

// map catcatenation
const cat = require("./cat");
function mapcat(func, coll) {
  return cat.apply(null, _.map(coll, func));
}

module.exports = mapcat;
