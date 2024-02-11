describe("Next step modal", () => {
  beforeEach(() => {
    cy.fixture("shoppingCart.json").then((fixture) => {
      localStorage.setItem("shoppingCart", JSON.stringify(fixture));
    });
    cy.visit("/shoppingcart");
    cy.wait(500);

    cy.get("[data-testid=modal]").as("modal");
  });

  it("should handle next step modal", () => {
    cy.get("[data-testid=shopping-cart-next-step-btn]").click();

    cy.get("@modal")
      .should("be.visible")
      .and("have.class", "show")
      .and("have.class", "side-modal")
      .and("have.attr", "open");

    cy.get("body").type("{esc}");
    cy.get("@modal").should("not.be.visible");
  });
});
