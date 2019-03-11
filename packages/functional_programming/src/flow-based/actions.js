const cat = require("../cat");
const existy = require("../existy");

//Monad
function actions(acts, done) {
  return function(seed) {
    const init = { values: [], state: seed };

    /* 
    Actions expects the result from each function to be an object of two keys: answer and state.
    The answer value corresponds to the result of calling the function and the state value represents
    what the new state looks like after the “action” is performed. 
    */

    const intermediate = acts.reduce((stateObj, action) => {
      const result = action(stateObj.state);
      const values = cat(stateObj.values, [result.answer]);

      return { values: values, state: result.state };
    }, init);

    const keep = intermediate.values.filter(existy);

    return done(keep, intermediate.state);
  };
}

module.exports = actions;
