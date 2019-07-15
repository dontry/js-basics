import ComparisonCompactor from "./ComparisonCompactor";

describe("ComparisonCompactor", () => {
  it('should be false when compare "b" and "c" ', () => {
    const assertion = new ComparisonCompactor(
      0,
      "b",
      "c"
    ).formatCompactedComparison("a");
    expect(assertion).toBe("a expected:<[b]> but was:<[c]>");
  });

  test("start same", () => {
    const assertion = new ComparisonCompactor(
      1,
      "ba",
      "bc"
    ).formatCompactedComparison(null);
    expect(assertion).toBe("expected:<b[a]> but was:<b[c]>");
  });

  test("end same", () => {
    const assertion = new ComparisonCompactor(
      1,
      "ab",
      "cb"
    ).formatCompactedComparison(null);
    expect(assertion).toBe("expected:<[a]b> but was:<[c]b>");
  });

  test("no context start and end same", () => {
    const assertion = new ComparisonCompactor(
      0,
      "abc",
      "adc"
    ).formatCompactedComparison(null);
    expect(assertion).toBe("expected:<...[b]...> but was:<...[d]...>");
  });

  test(" start and end context", () => {
    const assertion = new ComparisonCompactor(
      1,
      "abc",
      "adc"
    ).formatCompactedComparison(null);
    expect(assertion).toBe("expected:<a[b]c> but was:<a[d]c>");
  });

  test(" start and end context with ellipsis", () => {
    const assertion = new ComparisonCompactor(
      1,
      "abcde",
      "abfde"
    ).formatCompactedComparison(null);
    expect(assertion).toBe("expected:<...b[c]d...> but was:<...b[f]d...>");
  });
});
