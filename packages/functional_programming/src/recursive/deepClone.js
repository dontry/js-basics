const _ = require("lodash");
const existy = require("../existy");
function deepClone(obj) {
  if (!existy(obj) || !_.isObject(obj)) return obj;

  const temp = new obj.constructor();

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      temp[key] = deepClone(obj[key]);
    }
  }
  return temp;
}

module.exports = deepClone;
