const thumbWar = require("./thumb-war");
const utils = require("./utils");
const fn = require("./__tests__/mock-fn");

test("returns winner", () => {
  const originalGetWinner = utils.getWinner;
  // eslint-disable-next-line no-unused-vars
  utils.getWinner = fn((p1, p2) => p1);
  const winner = thumbWar("John Doe", "Will Smith");
  expect(winner).toBe("John Doe");
  expect(utils.getWinner).toHaveBeenCalledTimes(2);
  expect(utils.getWinner).toHaveBeenNthCalledWith(1, "John Doe", "Will Smith");
  expect(utils.getWinner).toHaveBeenNthCalledWith(2, "John Doe", "Will Smith");
  expect(utils.getWinner.mock.calls).toEqual([
    ["John Doe", "Will Smith"],
    ["John Doe", "Will Smith"]
  ]);

  //cleanup
  utils.getWinner = originalGetWinner;
});
