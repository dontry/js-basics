const _ = require("lodash");

function checker() {
  const validators = Array.from(arguments);
  return function(obj) {
    return validators.reduce(function(errs, check) {
      if (check(obj)) {
        return errs;
      } else {
        return _.chain(errs)
          .push(check.message)
          .value();
      }
    }, []);
  };
}

function validator(message, func) {
  const f = function() {
    return func.apply(func, arguments);
  };

  f["message"] = message;
  return f;
}

module.exports = { checker, validator };
