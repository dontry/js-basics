const _ = require("lodash");
const fp = require("lodash/fp");
const precondition = require("./precondition");
const { partial } = require("./partial");
const { validator } = require("../high_order_functions/validator");

const not = x => !x;

describe(" compose", () => {
  it("should return not string", () => {
    const isntString = fp.compose([not, fp.isString]);

    expect(isntString(1)).toBe(true);
  });
});

describe("post condition", () => {
  const sqrPre = precondition(
    validator("arg must not be zero", arg => arg !== 0),
    validator("arg must be a number", arg => _.isNumber(arg))
  );
  const uncheckedSqr = n => n * n;
  const checkedSqr = partial(sqrPre, uncheckedSqr);
  const sqrPost = precondition(
    validator("result should be positive", x => x > 0)
  );

  it("should return positive error", () => {
    try {
      sqrPost(_.identity, -1);
    } catch (error) {
      expect(error.message).toBe("result should be positive");
    }
  });

  const megaCheckedSqr = fp.compose([partial(sqrPost, _.identity), checkedSqr]);
  it("should return 100", () => {
    expect(megaCheckedSqr(10)).toBe(100);
  });

  it("should return positive error", () => {
    try {
      expect(megaCheckedSqr(NaN)).toBe(10);
    } catch (error) {
      expect(error.message).toEqual("result should be positive");
    }
  });
});
