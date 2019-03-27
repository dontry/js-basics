describe("login", () => {
  it("should login an existing user", () => {
    cy.createUser().then(user => {
      cy.visit("/")
        .getByText(/login/i)
        .click()
        .getByLabelText(/username/i)
        .type(user.username)
        .getByLabelText(/password/i)
        .type(user.password)
        .getByText(/submit/i)
        .click()
        // Now let's verify things after login
        .url()
        .should("eq", `${Cypress.config().baseUrl}`)
        .window()
        .its("localStorage.token")
        .should("be.a", "string")
        .getByTestId("username-display", { timeout: 500 })
        .should("have.text", user.username);
    });
  });
});
