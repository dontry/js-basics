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
  mockFn.mockImplementation = newImpl => (impl = newImpl);
  return mockFn;
}

const originalGetWinner = utils.getWinner;
// eslint-disable-next-line no-unused-vars
utils.getWinner = fn((p1, p2) => p1);
const winner = thumbWar("John Doe", "Will Smith");
assert.strictEqual(winner, "John Doe");
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ["John Doe", "Will Smith"],
  ["John Doe", "Will Smith"]
]);

// cleanup
utils.getWinner = originalGetWinner;

module.exports = fn;
