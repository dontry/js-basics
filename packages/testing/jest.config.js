//jest-environment-jsdom is browser env containing a window object
module.exports = {
  projects: ["./other/jest.config.js", "./other/jest.no-framework.config.js"],
  testEnvironment: "jest-environment-node"
};
