const trampoline = require("./trampoline");
const { partial1 } = require("../composer/partial");

function evenOline(n) {
  if (n === 0) return true;
  else return partial1(oddOline, Math.abs(n) - 1);
}

function oddOline(n) {
  if (n === 0) return false;
  else return partial1(evenOline, Math.abs(n) - 1);
}

//oddOline(3)
//=> function () { return evenOline(Math.abs(n) - 1) }

//oddOline(3)();
//=> function () { return oddOline(Math.abs(n) - 1) }

//oddOline(3)
//=> function () { return evenOline(Math.abs(n) - 1) }

//oddOline(3)()()();
//=> true”

function isEvenSafe(n) {
  if (n === 0) return true;
  else return trampoline(partial1(oddOline, Math.abs(n) - 1));
}

function isOddSafe(n) {
  if (n === 0) return false;
  else return trampoline(partial1(evenOline, Math.abs(n) - 1));
}

describe("isEvenSafe", () => {
  it("should return true", () => {
    const res = isEvenSafe(100);
    expect(res).toBeTruthy();
  });
});
