const iterateUtils = require("./iterateUtils");

it("should return exponential number till 64", () => {
  const res = iterateUtils(n => n + n, n => n <= 64, 1);
  expect(res).toEqual([2, 4, 8, 16, 32, 64]);
});
