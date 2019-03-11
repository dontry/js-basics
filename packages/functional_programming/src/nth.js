const _ = require("lodash");

function isIndexed(data) {
  return Array.isArray(data) || _.isString(data);
}

function nth(data, index) {
  if (!_.isNumber(index)) throw new Error("Expect a number as an index");
  if (!isIndexed) throw new Error("Not supported on non-indexed type");
  if (index < 0 || index > data.length + 1)
    throw new Error("Index out of bound");

  return data[index];
}

module.exports = nth;
