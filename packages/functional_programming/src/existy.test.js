const existy = require("./existy");

describe("existy", () => {
  it("should return false for null", () => {
    expect(existy(null)).toBeFalsy();
  });

  it("should return false for undefined", () => {
    expect(existy(undefined)).toBeFalsy();
  });

  it("shhould retunr false if property not exist", () => {
    expect(existy({}.noHere)).toBeFalsy();
  });
});
