const _ = require("lodash");

const match = _.curry(function(what, str) {
  return str.match(what);
});

const replace = _.curry(function(what, replacement, str) {
  return str.replace(what, replacement);
});

const filter = _.curry(function(f, ary) {
  return ary.filter(f);
});

const map = _.curry(function(f, ary) {
  return ary.map(f);
});

const xx = match(/\s+/g, "hello world");
xx;

const hasSpaces = match(/\s+/g);
const yy = hasSpaces("asdf  asdfas a sdf    ");
yy;

const noVowels = replace(/[aeiouy]/gi);
const censored = noVowels("*");
const res = censored("international");
res;