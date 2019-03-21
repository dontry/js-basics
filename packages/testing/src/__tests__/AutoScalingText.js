import React from "react";
import { render } from "calculator-test-utils";
import AutoScalingText from "../components/AutoScalingText";

test("renders", () => {
  const { container } = render(<AutoScalingText />);
  console.log(container.innerHTML);
});
