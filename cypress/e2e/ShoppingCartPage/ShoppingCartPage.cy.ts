import { calculatePrice } from "../../../src/utils/calculatePrice";

describe("Shopping Cart Page", () => {
  beforeEach(() => {
    cy.fixture("shoppingCart.json").then((fixture) => {
      localStorage.setItem("shoppingCart", JSON.stringify(fixture));
    });
    cy.visit("/shoppingcart");

    cy.get("[data-testid=modal]").as("modal");
    cy.get("[data-testid=toast-notification]").as("toast");
  });

  it("should handle empty shopping cart", () => {
    localStorage.removeItem("shoppingCart");
    cy.reload();

    cy.get("h2").should("contain.text", "Twój koszyk jest pusty");
    cy.get("[data-testid=shopping-cart-empty]").should("exist");

    cy.get("[data-testid=shopping-cart-menu-btn]").click();
    cy.get("@modal").should("be.visible");
  });

  it("should handle shopping cart with products", () => {
    cy.get("[data-testid=shopping-cart-products-list]").within(() => {
      cy.get("li").as("products");
    });

    cy.fixture("shoppingCart.json").then((fixture) => {
      cy.get("@products").should("have.length", fixture.length);

      // First product
      cy.get("@products").first().as("firstProduct");
      cy.get("@firstProduct").within(() => {
        cy.get("[data-testid=quantity-input]").as("firstProductQuantityBlock");
        cy.get("@firstProductQuantityBlock").within(() => {
          cy.get("input").as("firstProductQuantityInput");
        });
        cy.get("[data-testid=shopping-cart-product-price]").as(
          "firstProductPrice",
        );

        cy.get("@firstProductPrice").should(
          "contain.text",
          `${fixture[0].price.integer},${fixture[0].price.decimal ? fixture[0].price.decimal : "-"}`,
        );
        cy.get("@firstProductQuantityInput").should("have.value", "1");
        cy.get("@firstProductQuantityInput").type("2");
        cy.get("@firstProductQuantityInput").should("have.value", "2");

        cy.get("p").contains(
          `${fixture[0].price.integer},${fixture[0].price.decimal ? fixture[0].price.decimal : "-"}/szt.`,
        );
        cy.get("@firstProductPrice").should(
          "contain.text",
          calculatePrice(2, fixture[0].price.integer, fixture[0].price.decimal),
        );
      });

      // Second product
      cy.get("@products").eq(1).as("secondProduct");
      cy.get("@secondProduct").within(() => {
        cy.get("button[data-testid=shopping-cart-delete-product-btn]").as(
          "deleteProductBtn",
        );

        cy.get("@deleteProductBtn").click();
      });
      cy.get("@toast").should("be.visible");
      cy.get("@toast").should(
        "contain.text",
        `Usunięto produkt ${fixture[1].collection} z koszyka`,
      );
      cy.get("@products").should("have.length", fixture.length - 1);

      // Third product
      cy.get("@secondProduct").within(() => {
        cy.get("button[data-testid=shopping-cart-move-to-other-list-btn]").as(
          "moveToShoppingListBtn",
        );

        // Open side modal
        cy.get("@moveToShoppingListBtn").click();
        cy.get("@modal").should("be.visible");
        cy.get("@modal").within(() => {
          cy.get("button[data-testid=side-modal-close-btn]").click();
        });
        cy.get("@modal").should("not.be.visible");

        // Open image preview modal
        cy.get("button[data-testid=shopping-cart-product-img-button]").click();
        cy.get("@modal").should("be.visible");
      });
    });
    cy.get("body").type("{esc}");
    cy.get("@modal").should("not.be.visible");
  });
});
