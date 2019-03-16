function lazyChain(obj) {
  const _calls = [];

  return {
    invoke(methodName, ...args) {
      _calls.push(function(target) {
        const meth = target[methodName];
        return meth.apply(target, args);
      });
      return this;
    },
    force() {
      return _calls.reduce((ret, thunk) => {
        return thunk(ret);
      }, obj);
    },
    tap(func) {
      this._calls.push(target => {
        func(target);
        return target;
      });
    }
  };
}

module.exports = lazyChain;
