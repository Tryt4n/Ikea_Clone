describe("Add product by number Modal", () => {
  beforeEach(() => {
    cy.fixture("shoppingCart.json").then((fixture) => {
      localStorage.setItem("shoppingCart", JSON.stringify(fixture));
    });
    cy.visit("/shoppingcart");
    cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting

    cy.get("[data-testid=modal]").as("modal");
    cy.get("button[data-testid=shopping-cart-menu-btn]").as(
      "shoppingCartMenuBtn",
    );
  });

  it("should handle add product by number modal", () => {
    cy.get("@shoppingCartMenuBtn").click();
    cy.get("@modal").within(() => {
      cy.get("button[data-testid=add-product-by-number-modal-btn]").as(
        "addProductByNumberModalBtn",
      );
    });

    cy.get("@addProductByNumberModalBtn").click();
    cy.get("@modal").within(() => {
      cy.get("h2").as("modalTitle");
      cy.get("@modalTitle").should(
        "contain.text",
        "Dodaj produkt, wpisując jego numer",
      );
      cy.get("input[data-testid=add-product-by-number-input]").as(
        "productNumberInput",
      );
      cy.get("button[data-testid=side-modal-go-back-btn]").as("goBackBtn");
    });

    cy.get("@productNumberInput").type("103.242.78");
    cy.get("@productNumberInput").should("have.value", "103.242.78");

    cy.get("@goBackBtn").click();
    cy.get("@modalTitle").should("contain.text", "Koszyk");

    cy.get("body").type("{esc}");
    cy.get("@modal").should("not.be.visible");
  });
});
