import { Args, ArgsException, ErrorCode } from "./command-line";

describe("Args", () => {
  test("create with no schema or arguments", () => {
    const args: Args = new Args("", []);
    expect(args.cardinality()).toBe(0);
  });

  test("create with No schema but with one argument", () => {
    try {
      const args: Args = new Args("", ["-x"]);
    } catch (e) {
      const error: ArgsException = e;
      expect(error.getErrorCode()).toBe(ErrorCode.UNEXPECTED_ARGUMENT);
      expect(error.getErrorArgumentId()).toBe("x");
    }
  });

  test("create with No schema but with multiple arguments ", () => {
    try {
      const args: Args = new Args("", ["-x", "-y"]);
    } catch (e) {
      const error: ArgsException = e;
      expect(error.getErrorCode()).toBe(ErrorCode.UNEXPECTED_ARGUMENT);
      expect(error.getErrorArgumentId()).toBe("x");
    }
  });

  test("non-letter schema", () => {
    try {
      new Args("*", []);
    } catch (e) {
      const error: ArgsException = e;
      expect(error.getErrorCode()).toBe(ErrorCode.INVALID_ARGUMENT_NAME);
      expect(error.getErrorArgumentId()).toBe("*");
    }
  });
});

describe("Args", () => {});
