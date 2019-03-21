import React from "react";
import { render } from "react-testing-library";
import { ThemeProvider } from "emotion-theming";
import { dark } from "../themes";

function renderWithProviders(ui, options) {
  return render(<ThemeProvider theme={dark}>{ui}</ThemeProvider>, options);
}

export * from "react-testing-library";
export { renderWithProviders as render };
