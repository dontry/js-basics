const invoker = require("./invoker");

it("should return [[3,2,1]]", () => {
  const rev = invoker("reverse", Array.prototype.reverse);
  expect([[1, 2, 3]].map(rev)).toEqual([[3, 2, 1]]);
});
