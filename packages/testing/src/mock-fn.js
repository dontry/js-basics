/* 
This fn function accepts an implementation and returns a function that calls 
that implementation with all of those arguments.
*/
function fn(impl) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args);
    return impl(...args);
  };
  mockFn.mock = { calls: [] };
  return mockFn;
}

module.exports = fn;
