const cat = require("./cat");

//(3, [1,2,3]) => ([3,1,2,3])
function construct(head, tail) {
  return cat([head], Array.from(tail));
}

module.exports = construct;
