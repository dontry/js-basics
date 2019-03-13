function lazyChain(obj) {
  const calls = [];

  return {
    invoke(methodName, ...args) {
      calls.push(function(target) {
        const meth = target[methodName];
        return meth.apply(target, args);
      });
      return this;
    },
    force() {
      return calls.reduce((ret, thunk) => {
        return thunk(ret);
      }, obj);
    }
  };
}

module.exports = lazyChain;
