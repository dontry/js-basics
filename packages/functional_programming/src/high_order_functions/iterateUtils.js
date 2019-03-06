//A more generic function of repeat
function iterateUtils(func, check, init) {
  const ret = [];
  let result = func(init);

  while (check(result)) {
    ret.push(result);
    result = func(result);
  }
  return ret;
}

module.exports = iterateUtils;
