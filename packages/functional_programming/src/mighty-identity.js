const _ = require("lodash");
//“A Functor is a type that implements map and obeys some laws”
const Identity = function(value) {
  this._value = value;
};

Identity.of = function(value) {
  return new Identity(value);
};

Identity.prototype.map = function(f) {
  const newValue = f(this._value);
  return new Identity(newValue);
};

//An applicative functor is a pointed functor with an ap method
//F.of(x).map(f) == F.of(f).ap(F.of(x))
//functorX.map(f) = functorf.ap(functorX)
Identity.prototype.ap = function(otherIdentifier) {
  return otherIdentifier.map(this._value);
};

const add = x => y => x + y;

const g = Identity.of(add(2)).ap(Identity.of(3));
g;

//Maybe
const Maybe = function(x) {
  this.__value = x;
};

//Maybe looks a lot like Container with one minor change: it will first check to see if it has a value before calling the supplied function.
//This has the effect of side stepping those pesky nulls as we map

Maybe.of = function(x) {
  return new Maybe(x);
};

Maybe.prototype.isNothing = function() {
  return this.__value === null || this.__value === undefined;
};

Maybe.prototype.project = function(f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
};

Maybe.prototype.join = function() {
  return this.isNothing() ? Maybe.of(null) : this.__value;
};

const chain = _.curry(function(f, m) {
  return m.map(f).join(); // or compose(join, map(f))(m)
});

function curry(func) {
  return function(arg) {
    return func(arg);
  };
}

module.exports = {
  Identity,
  Maybe
};
