const path = require("path");
//We can go into the configuration for each one of these and add a displayName property.
module.exports = {
  ...require("./jest.common"),
  displayName: "server",
  testEnvironment: "jest-environment-node",
  //   coverageDirectory: path.join(__dirname, "../../coverage/server"),
  testMatch: ["**/__server_tests__/**/*.[jt]s?(x)"]
};
