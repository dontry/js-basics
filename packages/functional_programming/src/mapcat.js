const _ = require("lodash");

// map catcatenation
const cat = require("./cat");
function mapcat(func, collection) {
  return cat.apply(null, _.map(collection, func));
}

module.exports = mapcat;
