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
/*
spyOn function takes an object and a prop.
It is responsible for tracking the originalValue. 
Then it provides a mockRestore function, which we can use to restore the originalValue to that object.
*/
function spyOn(obj, prop) {
  const originalValue = obj[prop];
  obj[prop] = fn();
  obj[prop].mockRestore = () => (obj[prop] = originalValue);
}

spyOn(utils, "getWinner");
// eslint-disable-next-line no-unused-vars
utils.getWinner.mockImplementation((p1, p2) => p1);
const winner = thumbWar("John Doe", "Will Smith");
assert.strictEqual(winner, "John Doe");
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ["John Doe", "Will Smith"],
  ["John Doe", "Will Smith"]
]);

utils.getWinner.mockRestore();

module.exports = fn;
