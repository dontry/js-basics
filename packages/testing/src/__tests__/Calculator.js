import "react-testing-library/cleanup-after-each";
import React from "react";
import { render } from "react-testing-library";
import Calculator from "../components/Calculator";

test("renders", () => {
  render(<Calculator />);
});
