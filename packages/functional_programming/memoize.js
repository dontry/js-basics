const memoize = function(f) {
  const cache = {};

  return function() {
    arguments;
    cache;
    const arg_str = JSON.stringify(arguments);
    cache[arg_str] = cache[arg_str] || f.apply(f, arguments);
    return cache[arg_str];
  };
};

const square = memoize(function(x) {
  arguments;
  return x * x;
});

const a = square(4);
a;
