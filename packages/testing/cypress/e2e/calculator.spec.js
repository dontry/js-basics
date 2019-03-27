describe("calculator", () => {
  it("can make calculations", () => {
    cy.visit("/")
      .getByText(/^1$/)
      .click()
      .getByText(/^\+$/)
      .click()
      .then(subject => {
        debugger
        return subject
      })
      .getByText(/^2$/)
      .click()
      .getByText(/^=$/)
      .click()
      .getByTestId("total")
      .should("have.text", "3");
  });
});

