import React from "react";
import { render } from "calculator-test-utils";
import Calculator from "../components/Calculator";
import loadable from "react-loadable";

test("renders before loading", () => {
  const { container } = render(<Calculator />);
  expect(container.firstChild).toMatchSnapshot();
});

test("renders after loading", async () => {
  await loadable.preloadAll();
  const { container } = render(<Calculator />);
  expect(container.firstChild).toMatchSnapshot();
});
