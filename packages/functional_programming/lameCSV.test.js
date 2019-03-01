const fs = require("fs");
const util = require("util");
const { lameCSV } = require("./tableOp");
const readFile = util.promisify(fs.readFile);

describe("test lameCSV", () => {
  it("should import csv ", async () => {
    const data = await readFile("./table.csv", "utf8");
    const res = lameCSV(data);
    expect(res.length).toEqual(3);
    expect(res[0].length).toEqual(3);
  });
});
