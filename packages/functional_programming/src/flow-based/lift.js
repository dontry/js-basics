const construct = require("../construct");
function lift(answerFunc, stateFunc) {
  return function(...args) {
    return function(state) {
      const ans = answerFunc.apply(null, construct(state, args));
      const s = stateFunc ? stateFunc(state) : ans;

      return { answer: ans, state: s };
    };
  };
}

module.exports = lift;
