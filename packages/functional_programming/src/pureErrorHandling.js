const moment = require("moment");
const _ = require("lodash");

const Left = function(x) {
  this._value = x;
};

Left.of = function(x) {
  return new Left(x);
};

Left.prototype.map = function(f) {
  return this;
};

const Right = function(x) {
  this._value = x;
};

Right.of = function(x) {
  return new Right(x);
};

Right.prototype.project = function(f) {
  return Right.of(f(this._value));
};

const y = Right.of("rain").project(str => "b" + str);
y;

function partial(func) {
  return function(...args) {
    return func.apply(func, args);
  };
}

const getAge = partial((now, user) => {
  const birthdate = moment(user.birthdate, "YYYY-MM-DD");
  if (!birthdate.isValid()) return Left.of("Birth date could not be parsed.");
  return Right.of(now.diff(birthdate, "years"));
});

const right = getAge(moment(), { birthdate: "2005-12-01" });
right;
const left = getAge(moment(), {
  birthdate: "July 4, 2001"
});
left;

const either = _.curry(function(f, g, e) {
  switch (e.constructor) {
    case Left:
      return f(e._value);
    case Right:
      return g(e._value);
  }
});
