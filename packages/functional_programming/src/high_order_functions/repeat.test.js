const repeat = require("./repeat");

it("should return 3 ok", () => {
  const foo = () => "ok";
  const res = repeat(3, foo);
  expect(res).toEqual(["ok", "ok", "ok"]);
});
