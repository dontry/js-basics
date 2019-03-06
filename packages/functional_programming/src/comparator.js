function comparator(pred) {
  return function(x, y) {
    if (!!pred(x, y)) {
      return -1;
    } else if (!!pred(y, x)) {
      return 1;
    } else {
      return 0;
    }
  };
}

module.exports = comparator;
