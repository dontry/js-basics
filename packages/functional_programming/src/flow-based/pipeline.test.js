const _ = require("lodash");
const pipeline = require("./pipeline");

describe("pipeline", () => {
  it("should return undefined", () => {
    pipeline();
  });
  it("should return 42", () => {
    pipeline(42);
  });

  it("should return -42", () => {
    pipeline(42, n => -n);
  });

  const third = a => pipeline(a, _.tail, _.tail, _.first);
  it("should retur the third element", () => {
    expect(third([1, 2, 3])).toEqual(3);
  });

  it("should return the negative third element", () => {
    const negativeThird = a => pipeline(a, third, n => -n);
    expect(negativeThird([1, 2, 3])).toEqual(-3);
  });
});
