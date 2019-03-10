const _ = require("lodash");
const precondition = require("./precondition");
const { validator } = require("../high_order_functions/validator");
const { partial, partial1 } = require("./partial");

describe("sqrPre", () => {
  const sqrPre = precondition(
    validator("arg must not be zero", arg => arg !== 0),
    validator("arg must be a number", arg => _.isNumber(arg))
  );

  it("should return 10", () => {
    const res = sqrPre(_.identity, 10);
    expect(res).toEqual(10);
  });

  it("should return number error", () => {
    try {
      sqrPre(_.identity, "");
    } catch (error) {
      expect(error.message).toEqual("arg must be a number");
    }
  });

  it("should return zero error", () => {
    try {
      sqrPre(_.identity, 0);
    } catch (error) {
      expect(error.message).toEqual("arg must not be zero");
    }
  });

  const uncheckedSqr = n => n * n;
  const checkedSqr = partial(sqrPre, uncheckedSqr);

  it("should return 100", () => {
    expect(checkedSqr(10)).toEqual(100);
  });

  it("should return number error", () => {
    try {
      checkedSqr("");
    } catch (error) {
      expect(error.message).toEqual("arg must be a number");
    }
  });

  const evenSquare = partial1(
    precondition(validator("should be even", n => n % 2 === 0)),
    checkedSqr
  );

  it("should return even error", () => {
    try {
      evenSquare(11);
    } catch (error) {
      expect(error.message).toEqual("should be even");
    }
  });
});
