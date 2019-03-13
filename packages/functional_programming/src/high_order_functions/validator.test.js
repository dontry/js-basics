const _ = require("lodash");
const { checker, validator } = require("./validator");
const always = require("./always");

function hasKeys() {
  const KEYS = Array.from(arguments);
  const func = function(obj) {
    return KEYS.every(function(key) {
      return _.has(obj, key);
    });
  };
  func.message = `Must have values for keys: ${KEYS.join(", ")}`;
  return func;
}

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
});
