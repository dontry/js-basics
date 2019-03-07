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

describe("defaults", () => {
  const defaults = d => (o, k) => {
    const val = fnull(_.identity, d[k]);
    return o && val(o[k]);
  };

  const doSomething = config => {
    const lookup = defaults({ critical: 108 });
    return lookup(config, "critical");
  };

  it("should return 9", () => {
    expect(doSomething({ critical: 9 })).toEqual(9);
  });

  it("should return 108", () => {
    expect(doSomething({})).toEqual(108);
  });
});
