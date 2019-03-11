const _ = require("lodash");
const cat = require("../cat");

function flat(array) {
  if (Array.isArray(array)) return cat.apply(cat, _.map(array, flat));
  else return [array];
}

module.exports = flat;
