const {
  randomString,
  generateString,
  generateRandomCharacter
} = require("./randomString");
const repeat = require("../high_order_functions/repeat");
const always = require("../high_order_functions/always");

describe("generageString", () => {
  it("should return a string of a specific length", () => {
    const res = generateString(always("s"), 10);
    expect(res.constructor).toBe(String);
    expect(res.length).toBe(10);
  });

  it("should return a string congruent with its char generator", () => {
    const res = generateString(always("a"), 3);
    expect(res.length).toBe(3);
  });
});

describe("randomString", () => {
  const result = repeat(100, generateRandomCharacter);

  it("should return only strings of length 1", () => {
    expect(result.every(res => typeof res === "string")).toBeTruthy();
    expect(result.every(res => res.length === 1)).toBeTruthy();
  });

  it("should return a string of only letters or digits", () => {
    const regex = /[a-z0-9]/i;
    expect(result.every(res => regex.test(res))).toBeTruthy();
  });
});
