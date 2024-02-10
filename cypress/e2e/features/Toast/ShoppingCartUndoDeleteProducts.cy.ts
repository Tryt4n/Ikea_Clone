describe("Shopping cart page menu Modal", () => {
  beforeEach(() => {
    cy.fixture("shoppingCart.json").then((fixture) => {
      localStorage.setItem("shoppingCart", JSON.stringify(fixture));
    });
    cy.visit("/shoppingcart");
    cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting

    cy.get("[data-testid=modal]").as("modal");
    cy.get("[data-testid=toast-notification]").as("toast");
    cy.get("button[data-testid=shopping-cart-menu-btn]").as(
      "shoppingCartMenuBtn",
    );
  });

  it("should undo deletion of products in shopping cart", () => {
    cy.get("ul[data-testid=shopping-cart-products-list]").as("productsList");
    cy.get("@productsList").should("exist");

    cy.get("@shoppingCartMenuBtn").click();
    cy.get("@modal").within(() => {
      cy.get(
        "button[data-testid=delete-all-products-from-shopping-cart-modal-btn]",
      ).as("deleteAllProductsBtn");
    });

    cy.fixture("shoppingCart.json").then((fixture) => {
      cy.get("@productsList").children().should("have.length", fixture.length);

      cy.get("@deleteAllProductsBtn").click();

      cy.get("@toast")
        .should("be.visible")
        .and("contain.text", `Liczba usuniętych artykułów: ${fixture.length}`);

      cy.get("@toast").within(() => {
        cy.get("button[data-testid=toast-notification-undo-btn]").as(
          "toastUndoBtn",
        );
      });

      cy.get("@toastUndoBtn").should("exist");
      cy.get("@productsList").should("not.exist");
      cy.get("[data-testid=shopping-cart-empty]").as("shoppingCartEmpty");
      cy.get("@shoppingCartEmpty").should("exist").and("be.visible");

      cy.get("@toastUndoBtn").click();
      cy.get("@productsList").should("exist");
      cy.get("@productsList").children().should("have.length", fixture.length);
      cy.get("@shoppingCartEmpty").should("not.exist");
    });
  });
});
