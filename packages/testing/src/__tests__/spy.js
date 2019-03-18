const thumbWar = require("../thumb-war");
const utils = require("../utils");

//We can run jest.spyOn and pass utils as the object and 'getWinner' as the method.
test("returns winner", () => {
  //The.spyOn method will replace the getWinner on utils with an empty mock function.
  jest.spyOn(utils, "getWinner");
  //We have a specific implementation that we want to use for our mock function.
  // eslint-disable-next-line no-unused-vars
  utils.getWinner.mockImplementation((p1, p2) => p1);

  const winner = thumbWar("Kent C. Dodds", "Ken Wheeler");
  expect(winner).toBe("Kent C. Dodds");
  expect(utils.getWinner.mock.calls).toEqual([
    ["Kent C. Dodds", "Ken Wheeler"],
    ["Kent C. Dodds", "Ken Wheeler"]
  ]);

  // cleanup
  utils.getWinner.mockRestore();
});
