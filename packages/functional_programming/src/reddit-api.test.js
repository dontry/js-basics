const { app } = require("./reddit-api");

test("get user", async done => {
  const result = await app("dontry018");
  expect(result.data.name).toEqual("dontry018");
  done();
});
