const { Identity, Maybe } = require("./mighty-identity");

describe("mighty Identity", () => {
  it("should return Identity(4)", () => {
    const res = Identity.of(2).map(v => v + 2);
    expect(res).toEqual(new Identity(4));
  });
});
// Maybe will take care to check for a value each and every time it applies a function.

describe("Maybe", () => {
  it("should return [n,n]", () => {
    const res = Maybe.of("Japanese, Chinese").map(str => str.match(/n/gi));
    expect(res.__value).toEqual(["n", "n"]);
  });

  it("should return null", () => {
    const res = Maybe.of(null).map(str => str.match(/n/gi));
    expect(res.__value).toEqual(null);
  });

  it("should return null", () => {
    const res = Maybe.of("hahaha").map(str => str.match(/n/gi));
    expect(res.__value).toEqual(null);
  });
});
