const _ = require("lodash");
const { finder, best } = require("./finder");

const list = [1, 2, 3, 4, 5];

it("should return the max value", () => {
  const res = finder(_.identity, Math.max, list);
  expect(res).toEqual(5);
});

it("should return the max value", () => {
  expect(best((x, y) => x > y, [1, 2, 3, 4, 5])).toEqual(5);
});
