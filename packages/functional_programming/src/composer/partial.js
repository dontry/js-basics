const cat = require("../cat");
function partial(func, ...partialArgs) {
  return function() {
    const args = cat(partialArgs, Array.from(arguments));
    return func.apply(func, args);
  };
}

module.exports = partial;
