const cat = require("./cat");

/**
 * (a, b, c, d) => [a, b, c, d]
 * @param {*} head
 * @param {*} tail
 * @returns array
 */
function construct(head, tail) {
  return cat([head], Array.from(tail));
}

module.exports = construct;
