const _ = require("lodash");
const fnull = require("./fnull");

describe("safe multiply", () => {
  const safeMult = fnull((total, n) => total * n, 1, 1);
  const nums = [1, 2, 3, null, 5];
  it("should return 30", () => {
    const res = _.reduce(nums, safeMult);
    expect(res).toEqual(30);
  });
});
