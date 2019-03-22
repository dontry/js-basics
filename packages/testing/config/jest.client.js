module.exports = {
  ...require("./jest.common"),
  displayName: "client",
  testEnvironment: "jest-environment-jsdom",
  //after Jest is loaded
  setupFilesAfterEnv: [require.resolve("./setup-test.js")]
};
