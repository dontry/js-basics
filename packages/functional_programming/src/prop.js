const _ = require("lodash");
const fp = require("lodash/fp");

const x = {
  a: {
    b: 1
  },
  b: {
    a: 3
  },
  c: 3
};

const g = fp.compose([_.property("a"), _.property("b")]);
const res = g(x);

console.log(res);
