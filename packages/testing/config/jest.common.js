const path = require("path");
//jest-environment-jsdom is browser env containing a window object
module.exports = {
  // projects: ["./other/jest.config.js", "./other/jest.no-framework.config.js"],
  rootDir: path.join(__dirname, ".."),
  moduleDirectories: [
    "node_modules",
    path.join(__dirname, "../src"),
    "components",
    __dirname
  ],
  testPathIgnorePatterns: ["<rootDir>/cypress/"],
  //moduleNameMapper is a string regexp that matches the file we want to map to
  moduleNameMapper: {
    "\\.module\\.css$": "identity-obj-proxy",
    "\\.css$": require.resolve("../src/__mocks__/style-mock.js")
  },
  snapshotSerializers: ["jest-emotion"],
  //before Jest is loaded, doesn't rely on Jest
  setupFiles: [],
  collectCoverageFrom: ["**/src/**/*.js", "!**/src/lib/**"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
    "jest-watch-select-projects"
  ]
};
