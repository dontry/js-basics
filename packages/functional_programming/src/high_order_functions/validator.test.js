const _ = require("lodash");
const { checker, validator, hasKeys } = require("./validator");
const { curry2 } = require("../curry");
const always = require("./always");

describe("checkers", () => {
  it("should return empty array", () => {
    const alwaysPasses = checker(always(true), always(true));
    expect(alwaysPasses({})).toEqual([]);
  });

  it("should return empty array", () => {
    const fails = always(false);
    // @ts-ignore
    fails.message = "A failure";
    const alwaysFails = checker(fails, fails);
    expect(alwaysFails({})).toEqual(["A failure", "A failure"]);
  });
});

describe("validators", () => {
  it("should gonna fail", () => {
    const gonnaFail = checker(validator("OMG!", always(false)));
    expect(gonnaFail(100)).toEqual(["OMG!"]);
  });

  const anObject = obj => _.isObject(obj);
  it("should return true for an object", () => {
    const checkCommand = checker(validator("must be an object", anObject));
    expect(checkCommand({})).toEqual([]);
  });

  it("should return 'must be an object' for an number", () => {
    const checkCommand = checker(validator("must be an object", anObject));
    expect(checkCommand(123)).toEqual(["must be an object"]);
  });

  it("should return empty array", () => {
    const checkCommand = checker(
      validator("must be an object", anObject),
      hasKeys("msg", "type")
    );
    expect(checkCommand({ msg: "good", type: "string" })).toEqual([]);
  });

  it("should return hasKeys error for an empty object", () => {
    const checkCommand = checker(
      validator("must be an object", anObject),
      hasKeys("msg", "type")
    );
    expect(checkCommand({})).toEqual(["Must have values for keys: msg, type"]);
  });
  it("should return hasKeys and anObject error for a number", () => {
    const checkCommand = checker(
      validator("must be an object", anObject),
      hasKeys("msg", "type")
    );
    expect(checkCommand(10)).toEqual([
      "must be an object",
      "Must have values for keys: msg, type"
    ]);
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
