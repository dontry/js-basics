const _ = require("lodash");
const finder = require("./finder");

const list = [1, 2, 3, 4, 5];

it("should return the max value", () => {
  const res = finder(_.identity, Math.max, list);
  expect(res).toEqual(5);
});
