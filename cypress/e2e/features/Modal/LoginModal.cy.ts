describe("Login modal", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait("@getHomePage");
    cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting
  });

  it("open login modal", () => {
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
