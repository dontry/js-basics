import React from "react";
import { render } from "react-testing-library";
import Calculator from "../components/Calculator";

test("renders", () => {
  const { container, debug } = render(<Calculator />);
  debug(container);
});
