const construct = require("../construct");

function lift(answerFunc, stateFunc) {
  return function(...args) {
    return function(state) {
      const ans = answerFunc.apply(null, construct(state, args));
      // In the case of sqr and the negation function, both the answer and the state are the same value,
      // so I only needed to supply the answer function.
      const s = stateFunc ? stateFunc(state) : ans;

      return { answer: ans, state: s };
    };
  };
}

module.exports = lift;
