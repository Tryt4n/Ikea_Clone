describe("Additional informations modals", () => {
  beforeEach(() => {
    cy.fixture("shoppingCart.json").then((fixture) => {
      localStorage.setItem("shoppingCart", JSON.stringify(fixture));
    });
    cy.visit("/shoppingcart");
    cy.wait(300); // eslint-disable-line cypress/no-unnecessary-waiting

    cy.get("[data-testid=modal]").as("modal");
  });

  it("should handle first modal", () => {
    // First modal
    cy.get("[data-testid=shopping-cart-refund-btn]").click();
    cy.get("@modal")
      .should("be.visible")
      .and("have.class", "show")
      .and("have.class", "side-modal")
      .and("have.attr", "open");
    cy.get("@modal").within(() => {
      cy.get(
        "button[data-testid=additional-informations-modal-close-btn]",
      ).click();
    });
    cy.get("@modal").should("not.be.visible");
  });

  it("should handle second modal", () => {
    // Second modal
    cy.get("[data-testid=shopping-cart-data-encryption-btn]").click();
    cy.get("@modal")
      .should("be.visible")
      .and("have.class", "show")
      .and("have.class", "side-modal")
      .and("have.attr", "open");
    cy.get("@modal").within(() => {
      cy.get(
        "button[data-testid=additional-informations-modal-close-btn]",
      ).click();
    });
    cy.get("@modal").should("not.be.visible");
  });
});
