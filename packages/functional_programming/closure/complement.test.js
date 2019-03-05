const complement = require("./complement");

function isEven(n) {
  return n % 2 === 0;
}

const isOdd = complement(isEven);

it("should return true when number is 2", () => {
  const res = isEven(2);
  expect(res).toBeTruthy();
});

it("should return true when number is 3", () => {
  const res = isOdd(3);
  expect(res).toBeTruthy();
});
