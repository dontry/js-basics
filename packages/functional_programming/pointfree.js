const _ = require("lodash");
const compose = (f, g) => x => g(f(x));

var snakeCase = function(word) {
  return word.toLowerCase().replace(/\s+/gi, "_");
};

const map = _.curry((fn, arr) => arr.map(x => fn(x)));
const reduce = _.curry((fn, zero, arr) => arr.reduce(a => fn(a), zero));
const replace = _.curry((re, rpl, str) => str.replace(re, rpl));
const toLowerCase = _.curry(str => str.toLowerCase());
const trace = _.curry(function(tag, x) {
  console.log(tag, x);
  return x;
});

//pointfree
var snakeCase = compose(
  replace(/\s+/gi, "_"),
  trace("after snakecase"),
  toLowerCase
);

const x = snakeCase("HELLO WORLD");
x;
