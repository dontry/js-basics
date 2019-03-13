//A more generic function of repeat
function iterateUtils(func, check, seed) {
  const ret = [];
  let result = func(seed);

  while (check(result)) {
    ret.push(result);
    result = func(result);
  }
  return ret;
}

module.exports = iterateUtils;
