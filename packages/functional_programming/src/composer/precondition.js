const _ = require("lodash");
const mapcat = require("../mapcat");

function precondition() {
  const validators = Array.from(arguments);

  return function(func, arg) {
    const errors = mapcat(function(isValid) {
      return isValid(arg) ? [] : [isValid.message];
    }, validators);

    if (!_.isEmpty(errors)) {
      throw new Error(errors.join(", "));
    }
    return func(arg);
  };
}

module.exports = precondition;
