function fn(impl = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args);
    return impl(...args);
  };
  // eslint-disable-next-line no-unused-vars
  mockFn.mock = { calls: [] };
  return mockFn;
}

module.exports = {
  // eslint-disable-next-line no-unused-vars
  getWinner: fn((p1, p2) => p1)
};
