class ComparisonCompactor {
  static readonly ELLIPSIS: string = "...";
  static readonly DELTA_END: string = "]";
  static readonly DELTA_START: string = "[";
  private suffixLength: number;
  private prefixLength: number;

  constructor(
    private contextLength: number,
    private expected: string,
    private actual: string
  ) {}

  public formatCompactedComparison(msg: string = "") {
    if (this.shouldNotCompact()) {
      return Assert.format(msg, this.expected, this.actual);
    } else {
      this.findCommonPrefixAndSuffix();
      let compactExpected: string = this.compact(this.expected);
      let compactActual: string = this.compact(this.actual);
      return Assert.format(msg, compactExpected, compactActual);
    }
  }

  private compact(str: string): string {
    return `${this.startingEllipsis()}${this.startingContext()}${
      ComparisonCompactor.DELTA_START
    }${this.delta(str)}${
      ComparisonCompactor.DELTA_END
    }${this.endingContext()}${this.endingEllipsis()}`;
  }

  private findCommonPrefixAndSuffix() {
    this.findCommonPrefix();
    this.suffixLength = 0;
    for (
      ;
      !this.suffixOverlapsPrefix(this.prefixLength, this.suffixLength);
      this.suffixLength++
    ) {
      if (
        this.charFromEnd(this.expected, this.suffixLength) !==
        this.charFromEnd(this.actual, this.suffixLength)
      ) {
        break;
      }
    }
  }

  private findCommonPrefix(): void {
    this.prefixLength = 0;
    let end = Math.min(this.expected.length, this.actual.length);
    for (; this.prefixLength < end; this.prefixLength++) {
      if (
        this.expected.charAt(this.prefixLength) !==
        this.actual.charAt(this.prefixLength)
      ) {
        break;
      }
    }
  }

  private charFromEnd(s: string, i: number): string {
    return s.charAt(s.length - i - 1);
  }

  private suffixOverlapsPrefix(prefixLength: number, suffixLength: number) {
    return (
      this.actual.length - suffixLength < prefixLength ||
      this.expected.length - suffixLength < prefixLength
    );
  }

  private startingEllipsis(): string {
    return this.prefixLength > this.contextLength
      ? ComparisonCompactor.ELLIPSIS
      : "";
  }

  private startingContext(): string {
    const contextStart: number = Math.max(
      0,
      this.prefixLength - this.contextLength
    );
    const contextEnd: number = this.prefixLength;
    return this.expected.substring(contextStart, contextEnd);
  }

  private delta(str: string): string {
    const deltaStart: number = this.prefixLength;
    const deltaEnd: number = str.length - this.suffixLength;

    return str.substring(deltaStart, deltaEnd);
  }

  private endingContext(): string {
    const contextStart: number = this.expected.length - this.suffixLength;
    const contextEnd: number = Math.min(
      contextStart + this.contextLength,
      this.expected.length
    );
    return this.expected.substring(contextStart, contextEnd);
  }

  private endingEllipsis(): string {
    return this.suffixLength > this.contextLength
      ? ComparisonCompactor.ELLIPSIS
      : "";
  }

  private shouldNotCompact(): boolean {
    return (
      this.expected == null || this.actual == null || this.areStringsEqual()
    );
  }

  private areStringsEqual(): boolean {
    return this.actual === this.expected;
  }
}

class Assert {
  static format(message: string = "", str1: string, str2: string) {
    return `${
      message == null ? "" : message + " "
    }expected:<${str1}> but was:<${str2}>`;
  }
}

export default ComparisonCompactor;
