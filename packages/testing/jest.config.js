//jest-environment-jsdom is browser env containing a window object
module.exports = {
  // projects: ["./other/jest.config.js", "./other/jest.no-framework.config.js"],
  testEnvironment: "jest-environment-jsdom",
  //moduleNameMapper is a string regexp that matches the file we want to map to
  moduleNameMapper: {
    "\\.css$": require.resolve("./src/__mocks__/style-mock.js")
  }
};
