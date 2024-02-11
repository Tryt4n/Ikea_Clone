import { FavouritesListType } from "../../../src/context/AppContext/types/FavouritesListType";

describe("Single List Page", () => {
  let lists: FavouritesListType[] = [];

  before(() => {
    cy.fixture("lists.json").then((data) => (lists = data));
  });

  beforeEach(() => {
    localStorage.setItem("favouriteLists", JSON.stringify(lists));
    cy.visit(`/favourites/${lists[0].id}`);

    cy.get("[data-testid=modal]").as("modal");
    cy.get("[data-testid=toast-notification]").as("toast");
  });

  it("should navigate to lists page if list does not exist", () => {
    localStorage.clear();
    cy.reload();

    cy.url().should((url) => {
      expect(url).to.eq(Cypress.config().baseUrl + "/favourites");
    });
  });

  it("should display empty page if list does not have any products", () => {
    const listWithoutProducts = {
      ...lists[0],
      products: [],
    };
    const newLists = lists.map((list) =>
      list.id === listWithoutProducts.id ? listWithoutProducts : list,
    );
    localStorage.setItem("favouriteLists", JSON.stringify(newLists));
    cy.reload();
    cy.wait(300);

    cy.get("[data-testid=list-page-empty-list]")
      .should("exist")
      .and("be.visible");

    cy.get('button[aria-label="Przejdź do strony głównej"]').click();
    cy.url().should((url) => {
      expect(url).to.eq(Cypress.config().baseUrl + "/");
    });
    cy.go("back");

    cy.get("button[data-testid=change-list-name-modal-btn]").click();
    cy.get("@modal").should("be.visible");
    cy.get("body").type("{esc}");
    cy.get("@modal").should("not.be.visible");

    cy.get("button[data-testid=list-control-menu-modal-btn").click();
    cy.get("@modal").should("be.visible");
    cy.get("ul[data-testid=product-control-menu-modal]")
      .children()
      .should("have.length", 3);
    cy.get("button[data-testid=side-modal-close-btn]").click();
    cy.get("@modal").should("not.be.visible");
  });

  it("should handle switch", () => {
    cy.get("[data-testid=switch]").within(() => {
      cy.get("button").as("switchButtons");
    });
    cy.get("@switchButtons").first().as("firstButton");
    cy.get("@switchButtons").last().as("secondButton");

    cy.get("@firstButton").should("be.disabled");
    cy.get("@secondButton").should("not.be.disabled");

    cy.get("@secondButton").click();
    cy.get("@firstButton").should("not.be.disabled");
    cy.get("@secondButton").should("be.disabled");

    cy.get("@firstButton").click();
    cy.get("@firstButton").should("be.disabled");
    cy.get("@secondButton").should("not.be.disabled");
  });

  it("should handle list control menu", () => {
    cy.wait(300);

    cy.get("button[data-testid=open-list-menu-modal]")
      .as("listControlBtn")
      .click();

    cy.get("@modal")
      .should("be.visible")
      .within(() => {
        cy.get("ul[data-testid=product-control-menu-modal]")
          .children()
          .should("have.length", 5);
      });

    cy.get("body").type("{esc}");
    cy.get("@modal").should("not.be.visible");
  });

  it("should properly handle list products", () => {
    cy.wait(300);

    cy.get("ul[data-testid=list-products-list]").as("productsList");
    cy.get("[data-testid=list-total-price]").as("price");
    cy.get("[data-testid=list-total-price-for-members]").as("priceForMembers");

    cy.get("@productsList")
      .children()
      .should("have.length", lists[0].products!.length + 1);
    cy.get("@price").should("contain.text", "4787,89");
    cy.get("@priceForMembers").should("contain.text", "4620,39");

    // Change quantity for the first product
    cy.get("@productsList").within(() => {
      cy.get("[data-testid=list-product]").first().as("firstProduct");
    });
    cy.get("@firstProduct").within(() => {
      cy.get("[data-testid=list-product-price]").as("firstProductPrice");
      cy.get("[data-testid=quantity-input]").as("firstProductQuantityInput");
      cy.get("button[data-testid=list-product-add-to-cart-btn]").as(
        "firstProductAddToCartBtn",
      );
      cy.get("button[data-testid=list-product-delete-product-from-list]").as(
        "firstProductDeleteFromListBtn",
      );
      cy.get("[data-testid=list-product-more-options-btn]").as(
        "firstMoreOptionsBtn",
      );
    });
    cy.get("@firstProduct").should("contain.text", "/szt.");

    cy.get("@firstProductQuantityInput").within(() => {
      cy.get("button").first().click();
      cy.get("input").should("have.value", lists[0].products![0].quantity - 1);
    });
    cy.get("@firstProductPrice").should("contain.text", "1899");

    // Open more options modal for first product
    cy.get("@firstMoreOptionsBtn").click();
    cy.get("@modal")
      .should("be.visible")
      .and(
        "contain.text",
        `Więcej możliwości dla ${lists[0].products![0].collection}`,
      );
    cy.get("body").type("{esc}");
    cy.get("@modal").should("not.be.visible");

    // Add first product to cart
    cy.get("[data-testid=shopping-cart-link]").as("shoppingCartLink");
    cy.get("@shoppingCartLink").children().should("have.length", 2);
    cy.get("@firstProductAddToCartBtn").click();
    cy.get("@shoppingCartLink").children().should("have.length.above", 2);
    cy.get("[data-testid=shopping-cart-badge]").should("contain.text", "1");
    cy.get("@toast")
      .should("be.visible")
      .and(
        "contain.text",
        `${lists[0].products![0].collection} dodano do koszyka.`,
      )
      .within(() => {
        cy.get("a").click();
      });
    cy.url().should((url) => {
      expect(url).to.eq(Cypress.config().baseUrl + "/shoppingcart");
    });
    cy.go("back");

    // Delete first product from list
    cy.get("@firstProductDeleteFromListBtn").click();
    cy.get("@productsList")
      .children()
      .should("have.length", lists[0].products!.length);
    cy.get("@toast")
      .should("be.visible")
      .and(
        "contain.text",
        `Usunięto ${lists[0].products![0].collection} z twojej listy.`,
      )
      .within(() =>
        cy
          .get("button[data-testid=toast-notification-undo-btn]")
          .should("be.visible"),
      );
    cy.get("@price").should("contain.text", "989,89");
    cy.get("@priceForMembers").should("contain.text", "955,39");
  });

  it("should handle managing only chosen products", () => {
    cy.wait(500);

    cy.get("[data-testid=list-product]").as("listProducts");
    cy.get("input[data-testid=list-product-checkbox]").as(
      "listProductCheckboxes",
    );

    // Add first product to manage list
    cy.get("@listProductCheckboxes").first().click({ force: true });

    cy.get("[data-testid=list-manage-selected-products]").as(
      "manageSelectedProductsContainer",
    );
    cy.get("@manageSelectedProductsContainer")
      .should("be.visible")
      .within(() => cy.get("ul").children().should("have.length", 1));

    // Remove first product from manage list and add it again
    cy.get("@listProductCheckboxes").first().click({ force: true });
    cy.get("@manageSelectedProductsContainer").should("not.exist");
    cy.get("@listProductCheckboxes").first().click({ force: true });
    cy.get("@manageSelectedProductsContainer")
      .should("be.visible")
      .within(() => cy.get("ul").children().should("have.length", 1));

    // Add second and third product to manage list
    cy.get("@listProductCheckboxes").eq(1).click({ force: true });
    cy.get("@manageSelectedProductsContainer").within(() =>
      cy.get("ul").children().should("have.length", 2),
    );

    cy.get("@listProductCheckboxes").eq(2).click({ force: true });
    cy.get("@manageSelectedProductsContainer").within(() =>
      cy.get("ul").children().should("have.length", 3),
    );

    // Open manage list modal
    cy.get("@manageSelectedProductsContainer").within(() =>
      cy.get("button[data-testid=manage-selected-products-btn]").click(),
    );
    cy.get("@modal")
      .should("be.visible")
      .within(() => {
        cy.get("ul").children().should("have.length", 3);
      });
    cy.get("body").type("{esc}");
    cy.get("@modal").should("not.be.visible");

    // Clear all products from manage list
    cy.get("@manageSelectedProductsContainer").within(() =>
      cy
        .get("button[data-testid=manage-selected-products-clear-all-btn]")
        .click(),
    );
    cy.get("@manageSelectedProductsContainer").should("not.exist");
  });

  it("should handle list sorting", () => {});
});
