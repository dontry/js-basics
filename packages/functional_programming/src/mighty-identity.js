//“A Functor is a type that implements map and obeys some laws”
const Identity = function(value) {
  this._value = value;
};

Identity.of = function(value) {
  return new Identity(value);
};

Identity.prototype.project = function(f) {
  const newValue = f(this._value);
  return new Identity.of(newValue);
};

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

module.exports = {
  Identity,
  Maybe
};
