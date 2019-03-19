import "react-testing-library/cleanup-after-each";
import React from "react";
import { render } from "react-testing-library";
import AutoScalingText from "../components/AutoScalingText";

test("renders", () => {
  const { container } = render(<AutoScalingText />);
  console.log(container.innerHTML);
});
