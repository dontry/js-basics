const path = require("path");
//jest-environment-jsdom is browser env containing a window object
module.exports = {
  // projects: ["./other/jest.config.js", "./other/jest.no-framework.config.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleDirectories: [
    "node_modules",
    path.join(__dirname, "src"),
    "components",
    "lib"
  ],
  //moduleNameMapper is a string regexp that matches the file we want to map to
  moduleNameMapper: {
    "\\.module\\.css$": "identity-obj-proxy",
    "\\.css$": require.resolve("./src/__mocks__/style-mock.js")
  },
  snapshotSerializers: ["jest-emotion"],
  //before Jest is loaded, doesn't rely on Jest
  setupFiles: [],
  //after Jest is loaded
  setupFilesAfterEnv: [require.resolve("./setup-test.js")],
  collectCoverageFrom: ["**/src/**/*.js", "!**/src/lib/**"],
  coverageThreshold: {
    global: {
      statements: 17,
      branches: 4,
      lines: 17,
      functions: 10
    }
    // "./src/no-framework/**": {
    //   statements: 100,
    //   branches: 100,
    //   lines: 100,
    //   functions: 100
    // }
  }
};
