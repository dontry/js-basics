import { Args, ArgsException, ErrorCode } from "./command-line";

describe("Args", () => {
  test("create with no schema or arguments", () => {
    const args: Args = new Args("", []);
    expect(args.cardinality()).toBe(0);
  });

  test("create with No schema but with one argument", () => {
    try {
      new Args("", ["-x"]);
    } catch (e) {
      if (e instanceof ArgsException) {
        expect(e.getErrorCode()).toBe(ErrorCode.UNEXPECTED_ARGUMENT);
        expect(e.getErrorArgumentId()).toBe("x");
      }
    }
  });

  test("create with No schema but with multiple arguments ", () => {
    try {
      new Args("", ["-x", "-y"]);
    } catch (e) {
      if (e instanceof ArgsException) {
        expect(e.getErrorCode()).toBe(ErrorCode.UNEXPECTED_ARGUMENT);
        expect(e.getErrorArgumentId()).toBe("x");
      }
    }
  });

  test("non-letter schema", () => {
    try {
      new Args("*", []);
    } catch (e) {
      if (e instanceof ArgsException) {
        expect(e.getErrorCode()).toBe(ErrorCode.INVALID_ARGUMENT_NAME);
        expect(e.getErrorArgumentId()).toBe("*");
      }
    }
  });

  test("invalid argument format", () => {
    try {
      new Args("f-", []);
    } catch (e) {
      if (e instanceof ArgsException) {
        expect(e.getErrorCode()).toBe(ErrorCode.INVALID_ARGUMENT_FORMAT);
        expect(e.getErrorArgumentId()).toBe("f");
      }
    }
  });

  test("simple boolean argument", () => {
    const args = new Args("x", ["-x"]);
    expect(args.cardinality()).toBe(1);
    expect(args.getBoolean("x")).toBe(true);
  });

  test("simple string argument", () => {
    const args = new Args("x*", ["-x", "param"]);
    expect(args.cardinality()).toBe(1);
    expect(args.has("x")).toBeTruthy();
    expect(args.getString("x")).toBe("param");
  });

  test("missing string argument", () => {
    try {
      new Args("x*", ["-x"]);
    } catch (e) {
      if (e instanceof ArgsException) {
        expect(e.getErrorCode()).toBe(ErrorCode.MISSING_NUMBER);
        expect(e.getErrorArgumentId()).toBe("x");
      }
    }
  });

  test("space in format", () => {
    const args = new Args("x, y", ["-xy"]);
    expect(args.cardinality()).toBe(2);
    expect(args.has("x")).toBeTruthy();
    expect(args.has("y")).toBeTruthy();
  });

  test("number argument", () => {
    const args = new Args("x#", ["-x", "42"]);
    expect(args.cardinality()).toBe(1);
    expect(args.has("x")).toBeTruthy();
    expect(args.getNumber("x")).toBe(42);
  });

  test("missing number argument", () => {
    try {
      new Args("x#", ["-x"]);
    } catch (e) {
      if (e instanceof ArgsException) {
        expect(e.getErrorCode()).toBe(ErrorCode.MISSING_NUMBER);
        expect(e.getErrorArgumentId()).toBe("x");
      }
    }
  });

  test("invalid number argument", () => {
    try {
      new Args("x#", ["-x", "xx"]);
    } catch (e) {
      if (e instanceof ArgsException) {
        expect(e.getErrorCode()).toBe(ErrorCode.INVALID_NUMBER);
        expect(e.getErrorArgumentId()).toBe("x");
        expect(e.getErrorParameter()).toBe("xx");
      }
    }
  });
});

describe("Args", () => {});
