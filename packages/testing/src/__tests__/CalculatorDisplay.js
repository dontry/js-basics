import "react-testing-library/cleanup-after-each";
import React from "react";
import { render } from "react-testing-library";
import CalculatorDisplay from "../components/CalculatorDisplay";
import serializer from "jest-emotion";
import * as emotion from "emotion";
//We could actually snapshot container.innerHTML,
//but the problem with that is any change to any of these attributes would negate the entire snapshot
// would be harder to read diffs of the snapshot.
//If you only have one child that you're rendering, then it doesn't actually make any sense to snapshot that diff.
//You could actually snapshot the firstChild which will be the root node of the thing that you're rendering.
//For us that's this div here.

expect.addSnapshotSerializer(serializer);

test("renders with correct styles", () => {
  // const { container } = render(<H1>hello world</H1>);
  const { container } = render(<CalculatorDisplay value="10" />);

  expect(container).toMatchSnapshot();
});
