/**
 *  Lazy execution or short circuit operation.
 *  Using recursive functions is a way to hide recursive iterators.
 *
 * @param {*} preds
 * @returns
 */
function andify(...preds) {
  return function(...args) {
    const everything = function(ps, truth) {
      if (ps.length === 0) {
        return truth;
      } else {
        const [ps0, ...rest] = ps;
        return args.every(arg => ps0(arg)) && everything(rest, truth);
      }
    };
    return everything(preds, true);
  };
}

module.exports = andify;
