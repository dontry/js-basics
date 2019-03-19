//jest.mock works, because Jest is in control of the whole module system.We can simulate that same kind of control by using the require.cache
const utilsPath = require.resolve("../utils");
require.cache[utilsPath] = {
  id: utilsPath,
  filename: utilsPath,
  loaded: true,
  exports: {
    // eslint-disable-next-line no-unused-vars
    getWinner: fn((p1, p2) => p1)
  }
};

const assert = require("assert");
const thumbWar = require("../thumb-war");
const utils = require("../utils");
/* 
This fn function accepts an implementation and returns a function that calls 
that implementation with all of those arguments.
*/
function fn(impl = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args);
    return impl(...args);
  };
  mockFn.mock = { calls: [] };
  return mockFn;
}

const winner = thumbWar("John Doe", "Will Smith");
assert.strictEqual(winner, "John Doe");
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ["John Doe", "Will Smith"],
  ["John Doe", "Will Smith"]
]);

//cleanup
delete require.cache[utilsPath];
