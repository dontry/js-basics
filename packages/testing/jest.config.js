//jest-environment-jsdom is browser env containing a window object
module.exports = {
  ...require("./config/jest.common"),
  collectCoverageFrom: ["**/src/**/*.js"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/cypress/"],
  coverageThreshold: {
    global: {
      statements: 10,
      branches: 4,
      lines: 10,
      functions: 10
    }
    // "../src/no-framework/**": {
    //   statements: 100,
    //   branches: 100,
    //   lines: 100,
    //   functions: 100
    // }
  },
  //Jest will combine the coverage report for both the client and the server
  projects: [
    "./config/jest.client.js",
    "./config/jest.server.js",
    "./config/jest.lint.js"
  ]
};
