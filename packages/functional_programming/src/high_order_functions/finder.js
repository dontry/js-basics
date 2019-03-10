const _ = require("lodash");
function finder(valueFun, bestFun, collection) {
  return _.reduce(collection, (best, current) => {
    const bestValue = valueFun(best);
    const currentValue = valueFun(current);

    return bestValue == bestFun(bestValue, currentValue) ? best : current;
  });
}

function best(fun, collection) {
  return _.reduce(collection, (x, y) => {
    return fun(x, y) ? x : y;
  });
}

module.exports = finder;
