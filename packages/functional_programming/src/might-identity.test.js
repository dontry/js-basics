const { Identity, Maybe } = require("./mighty-identity");

describe("mighty Identity", () => {
  it("should return Identity(4)", () => {
    const res = Identity.of(2).project(v => v + 2);
    expect(res).toEqual(new Identity(4));
  });
});
// Maybe will take care to check for a value each and every time it applies a function.

describe("Maybe", () => {
  it("should return [n,n]", () => {
    const res = Maybe.of("Japanese, Chinese").project(str => str.match(/n/gi));
    expect(res.__value).toEqual(["n", "n"]);
  });

  it("should return null", () => {
    const res = Maybe.of(null).project(str => str.match(/n/gi));
    expect(res.__value).toEqual(null);
  });

  it("should returl null", () => {
    const res = Maybe.of("hahaha").project(str => str.match(/n/gi));
    expect(res.__value).toEqual(null);
  });
});
