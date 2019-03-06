const always = require("./always");

it("should have same reference", () => {
  const f = always(() => {});
  expect(f() === f()).toBeTruthy();
});

it("should return difference references", () => {
  const f = always(() => {});
  const g = always(() => {});
  expect(g() === f()).toBeFalsy();
});
