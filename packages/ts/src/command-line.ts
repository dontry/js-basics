// @ts-nocheck
function main() {
  const args = process.argv.slice(2);
  try {
    const arg = new Args("", args);
  } catch (e) {
    console.error("Error:", e.message);
  }
  args.forEach(arg => {
    console.log(arg);
  });
}

class Args {
  private schema: string;
  private marshalers: Map<string, ArgumentMarshaler>;
  private argsFound: Set<string>;
  private currentArgument: Iterator<string>;
  private argsList: string[];
  private unexpectedArguments: Set<string>;
  private errorParameter: string;
  private errorCode: ErrorCode;
  private valid: boolean;

  constructor(schema: string, args: string[]) {
    this.schema = schema;
    this.argsList = args;
    this.marshalers = new Map();
    this.argsFound = new Set();
    this.unexpectedArguments = new Set();
    this.errorParameter = "TILT";
    this.errorCode = ErrorCode.OK;
    this.valid = true;
    this.argsList = Array.from(args);
    this.currentArgument = createArrayIterator(this.argsList);
  }

  private parse() {
    this.parseSchema();
    this.parseArguments();
  }

  private parseSchema(): boolean {
    const elements = this.schema.split(",");

    elements.forEach((element: string) => {
      const trimmedElement: string = element.trim();
      this.parseSchemaElement(trimmedElement);
    });

    return true;
  }

  private parseSchemaElement(element: string): void {
    const elementId: string = element.charAt(0);
    const elementTail: string = element.substring(1);
    this.validateSchemaElementId(elementId);

    if (elementTail.length === 0) {
      this.marshalers.set(elementId, new BooleanArgumentMarshaler());
    } else if (elementTail === "*") {
      this.marshalers.set(elementId, new StringArgumentMarshaler());
    } else if (elementTail === "#") {
      this.marshalers.set(elementId, new NumberArgumentMarshaler());
    } else {
      throw new ArgsException(
        ErrorCode.INVALID_ARGUMENT_FORMAT,
        elementId,
        elementTail
      );
    }
  }

  validateSchemaElementId(elementId: string): void {
    if (!this.isLetter(elementId)) {
      throw new ArgsException(ErrorCode.INVALID_ARGUMENT_NAME, elementId);
    }
  }

  private parseArguments(): boolean {
    let done = false;
    while (!done) {
      const result = this.currentArgument.next();
      done = result.done;
      this.parseArgument(result.value);
    }
    return true;
  }

  private parseArgument(arg: string) {
    if (arg.startsWith("-")) {
      this.parseElements(arg);
    }
  }

  private parseElements(arg: string) {
    for (let i = 1; i < arg.length; i++) {
      this.parseElement(arg.charAt(i));
    }
  }

  private parseElement(argChar: string) {
    if (this.setArgument(argChar)) {
      this.argsFound.add(argChar);
    } else {
      this.unexpectedArguments.add(argChar);
      this.errorCode = ErrorCode.UNEXPECTED_ARGUMENT;
      this.valid = false;
    }
  }

  private setArgument(argChar: string): boolean {
    const am: ArgumentMarshaler = this.marshalers.get(argChar);
    if (am == null) {
      return false;
    }

    try {
      const result = this.currentArgument.next();
      am.set(result.value);
      return true;
    } catch (e) {
      this.valid = false;

      throw e;
    }
  }

  public cardinality(): number {
    return this.argsFound.size;
  }

  public usage(): string {
    if (this.schema.length > 0) {
      return `- [ ${this.schema}]`;
    } else {
      return "";
    }
  }

  private isLetter(char: string): boolean {
    const regex = /[a-z](1)/i;
    return regex.test(char);
  }

  public has(arg: string): boolean {
    return this.argsFound.has(arg);
  }

  public nextArgument(): number {
    return 0;
  }

  public getBoolean(arg: string): boolean {
    const am: ArgumentMarshaler = this.marshalers.get(arg);
    try {
      return am != null && (am.get() as boolean);
    } catch (e) {
      return false;
    }
  }

  public getString(arg: string): string {
    const am: ArgumentMarshaler = this.marshalers.get(arg);
    try {
      return am != null && (am.get() as string);
    } catch (e) {
      return "";
    }
  }

  public getNumber(arg: string): number {
    const am: ArgumentMarshaler = this.marshalers.get(arg);
    try {
      return am != null && (am.get() as number);
    } catch (e) {
      return 0;
    }
  }

  public isValid() {
    return this.valid;
  }
}

// interface ArgumentMarshaler {
//   set(currentArgument: Iterator<string>): void;
// }

// class BooleanArgumentMarshaler implements ArgumentMarshaler {
//   private booleanValue: boolean = false;
//   constructor(parameters) {}

//   public set(currentArgument: Iterator<string>): void {
//     this.booleanValue = true;
//   }

//   public static getValue(am: ArgumentMarshaler): boolean {
//     if (am !== null && am instanceof BooleanArgumentMarshaler) {
//       return (am as BooleanArgumentMarshaler).booleanValue;
//     } else {
//       return false;
//     }
//   }
// }

abstract class ArgumentMarshaler {
  public abstract set(argChar: string);
  public abstract get(): any;
}

class BooleanArgumentMarshaler extends ArgumentMarshaler {
  private booleanValue: boolean;

  public set(b: string): void {
    this.booleanValue = true;
  }

  public get(): boolean {
    return this.booleanValue;
  }
}

class StringArgumentMarshaler extends ArgumentMarshaler {
  private stringValue: string = "";
  public set(s: string): void {
    this.stringValue = s;
  }

  public get(): string {
    return this.stringValue;
  }
}

class NumberArgumentMarshaler extends ArgumentMarshaler {
  private numValue: number = 0;
  public set(n: string): void {
    this.numValue = Number(n);
  }

  public get(): number {
    return this.numValue;
  }
}

enum ErrorCode {
  OK,
  UNEXPECTED_ARGUMENT,
  MISSING_STRING,
  INVALID_NUMBER,
  MISSING_NUMBER,
  INVALID_ARGUMENT_NAME,
  INVALID_ARGUMENT_FORMAT
}

class ArgsException extends Error {
  constructor(
    private errorCode: ErrorCode = ErrorCode.OK,
    private errorArgumentId: string = "\0",
    private errorParameter: string | null = null
  ) {
    super();
  }

  public errorMessage() {
    switch (this.errorCode) {
      case ErrorCode.OK:
        return `TILT: Should not get here.`;
      case ErrorCode.UNEXPECTED_ARGUMENT:
        return `Argument ${this.errorArgumentId} unexpected.`;
      case ErrorCode.MISSING_STRING:
        return `Could not find string parameter for ${this.errorArgumentId}.`;
      case ErrorCode.INVALID_NUMBER:
        return `Argument ${this.errorArgumentId} expects an integer but was ${
          this.errorParameter
        }.`;
      case ErrorCode.MISSING_NUMBER:
        return `Could not find number parameter for ${this.errorArgumentId}.`;
      case ErrorCode.INVALID_ARGUMENT_NAME:
        return `${this.errorArgumentId} is not a valid argument name.`;
      case ErrorCode.INVALID_ARGUMENT_FORMAT:
        return `${this.errorParameter} is not a valid argument format.`;
      default:
        return "";
    }
  }
}

function createArrayIterator(array) {
  const arr = array;
  let nextIndex = 0;
  const arrayIterator = {
    next() {
      let result;
      if (nextIndex < arr.length - 1) {
        result = { value: arr[nextIndex], done: false };
        nextIndex++;
        return result;
      }
      return { value: arr[arr.length - 1], done: true };
    },
    hasNext() {
      return nextIndex < arr.length;
    }
  };
  return arrayIterator;
}

main();
