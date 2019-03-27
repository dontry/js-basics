import { build, fake } from "test-data-bot";
import { userBuilder } from "../support/generate";

describe("registration", () => {
  it("should register a new user", () => {
    const user = userBuilder();
    cy.visit("/")
      .getByText(/register/i)
      .click()
      .getByLabelText(/username/i)
      .type(user.username)
      .getByLabelText(/password/i)
      .type(user.password)
      .getByText(/submit/i)
      .click()
      .assertHome()
      .window()
      .its("localStorage.token")
      .should("be.a", "string")
      .getByTestId("username-display", { timeout: 500 });
  });

  it("should show an error message if there's an error registering", () => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3001/register",
      status: 400,
      response: {}
    });
    cy.visit("/register")
      .getByText(/submit/i)
      .click()
      .getByText(/error.*try again/i);
  });
});
