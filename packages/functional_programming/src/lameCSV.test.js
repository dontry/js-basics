const { join } = require("path");
const fs = require("fs");
const util = require("util");
const { lameCSV } = require("./tableOp");
const readFile = util.promisify(fs.readFile);

describe("test lameCSV", () => {
  it("should import csv ", async () => {
    const filename = join(__dirname, "table.csv");
    const data = await readFile(filename, "utf8");
    const res = lameCSV(data);
    expect(res.length).toEqual(3);
    expect(res[0].length).toEqual(3);
  });
});
