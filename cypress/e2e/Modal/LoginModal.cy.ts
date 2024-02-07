describe("Login modal", () => {
  it("open login modal", () => {
    cy.wait(300); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.get("[data-testid=modal]").as("modal");

    cy.get("[data-testid=login-btn]").click();

    cy.get("@modal")
      .should("be.visible")
      .and("have.class", "show")
      .and("have.class", "side-modal")
      .and("contain", "Zaloguj się");

    cy.get("[data-testid=side-modal-close-btn]").click();
    cy.get("@modal").should("not.be.visible");
  });
});
