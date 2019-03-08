const _ = require("lodash");
const existy = require("./existy");

//([1,2],[3,4])=> ([1,2,3,4])
function cat() {
  const head = _.first(arguments);
  if (existy(head)) {
    return head.concat.apply(head, _.tail(arguments));
  } else {
    return [];
  }
}

module.exports = cat;
