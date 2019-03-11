const trampoline = require("./trampoline");
const { partial1 } = require("../composer/partial");

function oddLine(n) {
  if (n === 0) return true;
  else return partial1(oddLine, Math.abs(n) - 1);
}

function isEvenSafe(n) {
  if (n === 0) return true;
  else return trampoline(partial1(oddLine, Math.abs(n) - 1));
}

describe("isEvenSafe", () => {
  it("should return true", () => {
    const res = isEvenSafe(1001);
    expect(res).toBeTruthy();
  });
});
