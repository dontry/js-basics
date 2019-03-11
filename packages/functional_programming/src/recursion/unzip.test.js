const _ = require("lodash");
const unzip = require("./unzip");

describe("unzip", () => {
  it("should unzip the code", () => {
    const res = unzip(_.zip([1, 2, 3], [4, 5, 6]));
    expect(res).toEqual([[1, 2, 3], [4, 5, 6]]);
  });
});
