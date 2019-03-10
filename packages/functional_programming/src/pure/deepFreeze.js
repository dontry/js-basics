const _ = require("lodash");
function deepFreeze(obj) {
  if (!Object.isFrozen(obj)) {
    Object.freeze(obj);
  }

  for (const key in obj) {
    if (!obj.hasOwnProperty(key) || !_.isObject(obj[key])) continue;

    deepFreeze(obj[key]);
  }
}

module.exports = deepFreeze;
