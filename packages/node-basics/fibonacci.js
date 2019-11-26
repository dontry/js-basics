var fib = function(n) {
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
};

// memoization
var fibonacci = function() {
  var cache = [1, 1];
  var fib = function(n) {
    if (n >= cache.length) {
      for (var i = cache.length; i <= n; i++) {
        cache[i] = cache[i - 2] + cache[i - 1];
      }
    }
    return cache[n];
  };
  return fib;
};

var fibonacci = (function() {
  var memo = [0, 1];
  var fib = function() {
    var result = memo[n];
    if (typeof result != "number") {
      result = fib(n - 1) + fib(n - 2);
      memo[n] = result;
    }
    return result;
  };
  return fib;
})();

var fibonacci = (function() {
  var cache = [1, 1];
  var fib = function(n) {
    if (n >= cache.length) {
      for (var i = cache.length; i <= n; i++) {
        cache[i] = cache[i - 2] + cache[i - 1];
      }
    }
    return cache[n];
  };
  return fib;
})();
