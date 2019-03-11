const cat = require("../cat");
function cycle(times, arr) {
  if (times <= 0) {
    return [];
  } else {
    return cat(arr, cycle(times - 1, arr));
  }
}

module.exports = cycle;
