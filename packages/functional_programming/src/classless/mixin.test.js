const { Hole } = require("./mixin");

const isEven = n => n % 2 === 0;

describe("xx", () => {
  const hole = new Hole(42);
  it("should return  42", () => {
    hole.addValidator(isEven);
    try {
      hole.setValue(9);
    } catch (error) {
      console.log(error.message);
      expect(error.message).toBeTruthy();
    }
  });
});
