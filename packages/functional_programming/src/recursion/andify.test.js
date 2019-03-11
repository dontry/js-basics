const _ = require("lodash");
const andify = require("./andify");

const isEven = x => x % 2 === 0;

describe("andify", () => {
  const evenNums = andify(_.isNumber, isEven);
  it("should return false", () => {
    evenNums(1, 2);
  });

  it("should return true", () => {
    evenNums(2, 3, 4, 6, 8);
  });
});
