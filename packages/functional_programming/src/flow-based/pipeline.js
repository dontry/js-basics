function pipeline(seed, ...args) {
  return args.reduce((l, r) => {
    return r(l);
  }, seed);
}

module.exports = pipeline;
