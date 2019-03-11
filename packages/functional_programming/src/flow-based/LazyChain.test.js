const LazyChain = require("./LazyChain");

describe("lazyChain", () => {
  it("should return '1,2,3,4,5,6,7,8'", () => {
    const res = new LazyChain([2, 1, 3])
      .invoke("concat", [4, 8, 5, 7, 6])
      .invoke("sort")
      .invoke("join", ",")
      .force();
    expect(res).toEqual("1,2,3,4,5,6,7,8");
  });
});
