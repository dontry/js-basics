const thumbWar = require("./thumb-war");
const utils = require("./utils");

test("returns winner", () => {
  const originalGetWinner = utils.getWinner;
  utils.getWinner = jest.fn((p1, _p2) => p1);
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
