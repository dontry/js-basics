import React from "react";
import { render } from "react-testing-library";
import Calculator from "../components/Calculator";
import loadable from "react-loadable";

test("renders before loading", () => {
  const { container, debug } = render(<Calculator />);
  expect(container.firstChild).toMatchSnapshot();
});

test("renders after loading", async () => {
  await loadable.preloadAll();
  const { container, debug } = render(<Calculator />);
  expect(container.firstChild).toMatchSnapshot();
});
