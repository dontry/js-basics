describe("calculator", () => {
  it("can make calculations", () => {
    cy.visit("/")
      .getByText(/^1$/)
      .click()
      .getByText(/^\+$/)
      .click()
      .then(subject => {
        return subject;
      })
      .getByText(/^2$/)
      .click()
      .getByText(/^=$/)
      .click()
      .getByTestId("total")
      .should("have.text", "3");
  });
});

describe("authenticated calculator", () => {
  it("displays the username", () => {
    cy.loginAsNewUser().then(user => {
      cy.visit("/")
        .getByTestId("username-display")
        .should("have.text", user.username)
        .getByText(/logout/i)
        .click()
        //To assert that something does not exist. We'll use a queryByTestId,
        //Because using getBy will throw an error if it doesn't exist
        .queryByTestId("username-display", { timeout: 300 })
        .should("not.exist");
    });
  });
});
