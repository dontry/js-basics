import { Args } from "./command-line";

describe("Args", () => {
  test("create with no schema or arguments", () => {
    const args: Args = new Args("", []);
    expect(args.cardinality()).toBe(0);
  });
});

describe("Args", () => {});
