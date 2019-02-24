const comparator = require("./comparator");

function lessOrEqual(x, y) {
  return x <= y;
}

describe("comparator ", () => {
  it("should sort the array in ascending order", () => {
    const result = [100, 1, 0, 10, -1, -2, -1].sort(comparator(lessOrEqual));
    expect(result).toEqual([-2, -1, -1, 0, 1, 10, 100]);
  });
});
