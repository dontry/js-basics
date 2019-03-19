//jest.mock works, because Jest is in control of the whole module system.
//We can simulate that same kind of control by using the require.cache
require("../__no-framework-mocks__/utils"); // prime the cache: Primed Cache: A Cache that contains some of the data from the source location.
const utilsPath = require.resolve("../utils");
const mockUtilsPath = require.resolve("../__no-framework-mocks__/utils");
require.cache[utilsPath] = require.cache[mockUtilsPath];

const assert = require("assert");
const thumbWar = require("../thumb-war");
const utils = require("../utils");

const winner = thumbWar("John Doe", "Will Smith");
assert.strictEqual(winner, "John Doe");
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ["John Doe", "Will Smith"],
  ["John Doe", "Will Smith"]
]);

//cleanup
delete require.cache[utilsPath];
