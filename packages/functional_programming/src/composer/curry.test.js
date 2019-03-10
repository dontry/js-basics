const { curry, curry2 } = require("./curry");
const { checker, validator } = require("../high_order_functions/validator");

describe("curry", () => {
  it("should return [11, NaN, 3, 4]", () => {
    //because parsInt has second arg which is radix
    //the second arg of map is index
    const res = ["11", "11", "11", "11"].map(parseInt);
    expect(res).toEqual([11, NaN, 3, 4]);
  });

  it("should return [11, 11, 11,11]", () => {
    //using curry makes sure that parseInt only take one argument
    const res = ["11", "11", "11", "11"].map(curry(parseInt));
    expect(res).toEqual([11, 11, 11, 11]);
  });

  it("within range", () => {
    const greaterThan = curry2(function(lhs, rhs) {
      return lhs > rhs;
    });
    const lessThan = curry2(function(lhs, rhs) {
      return lhs < rhs;
    });
    const withinRange = checker(
      validator("must greater than 10", greaterThan(10)),
      validator("must less than 20", lessThan(20))
    );

    expect(withinRange(30)).toEqual(["must less than 20"]);
    expect(withinRange(0)).toEqual(["must greater than 10"]);
  });
});
