// _.chain() is not lazy.
//so we build a LazyChain
function LazyChain(obj) {
  this._calls = [];
  this._target = obj;
}

LazyChain.prototype.invoke = function(methodName, ...args) {
  this._calls.push(function(target) {
    const meth = target[methodName];

    return meth.apply(target, args);
  });

  return this;
};

// A function that wraps some behavior for later execution is typically called a thunk
// redux-thunk: https://github.com/reduxjs/redux-thunk/blob/master/src/index.js
// The thunks never get called until invoking force
LazyChain.prototype.force = function() {
  return this._calls.reduce(function(target, thunk) {
    return thunk(target);
  }, this._target);
};

LazyChain.prototype.tap = function(func) {
  this._calls.push(function(target) {
    func(target);
    return target;
  });
  return this;
};

const x = new LazyChain([2, 1, 3]);

const thunks = x.invoke("sort")._calls;
const res = thunks[0]([2, 1, 3]);
res;

module.exports = LazyChain;
