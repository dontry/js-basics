const _ = require("lodash");
function finder(valueFun, bestFun, coll) {
  return _.reduce(coll, (best, current) => {
    const bestValue = valueFun(best);
    const currentValue = valueFun(current);

    return bestValue == bestFun(bestValue, currentValue) ? best : current;
  });
}

module.exports = finder;
