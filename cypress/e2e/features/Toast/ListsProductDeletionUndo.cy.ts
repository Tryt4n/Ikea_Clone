import { FavouritesListType } from "../../../../src/context/AppContext/types/FavouritesListType";

describe("List page undo action on Toast button click", () => {
  let lists: FavouritesListType[] = [];

  before(() => {
    cy.fixture("lists.json").then((data) => (lists = data));
  });

  beforeEach(() => {
    localStorage.setItem("favouriteLists", JSON.stringify(lists));
    cy.visit(`/favourites/${lists[0].id}`);

    cy.get("[data-testid=toast-notification]").as("toast");
  });

  it("should undo deletion of product in list", () => {
    cy.get("ul[data-testid=list-products-list]").as("productsList");

    cy.get("@productsList")
      .children()
      .should("have.length", lists[0].products!.length + 1);

    cy.get("[data-testid=list-product]")
      .first()
      .within(() =>
        cy
          .get("button[data-testid=list-product-delete-product-from-list]")
          .click(),
      );
    cy.get("@productsList")
      .children()
      .should("have.length", lists[0].products!.length);

    cy.get("@toast").should("be.visible");
    cy.get("@toast").within(() =>
      cy.get("button[data-testid=toast-notification-undo-btn]").click(),
    );

    cy.get("@productsList")
      .children()
      .should("have.length", lists[0].products!.length + 1);
  });

  it.only("should undo deletion of multiple products in list", () => {
    cy.wait(500);

    cy.get("[data-testid=modal]").as("modal");
    cy.get("ul[data-testid=list-products-list]").as("listProducts");
    cy.get("input[data-testid=list-product-checkbox]").as(
      "listProductCheckboxes",
    );

    cy.get("@listProducts")
      .children()
      .should("have.length", lists[0].products!.length + 1);

    cy.get("@listProducts").first().as("firstListProduct");

    cy.get("@listProductCheckboxes").first().click({ force: true });
    cy.get("@listProductCheckboxes").eq(1).click({ force: true });

    cy.get("[data-testid=list-manage-selected-products]").within(() =>
      cy.get("button[data-testid=manage-selected-products-btn]").click(),
    );

    cy.get("@modal").within(() => {
      cy.get(
        "button[data-testid=delete-selected-products-from-list-btn]",
      ).click();
    });

    cy.get("@listProducts")
      .children()
      .should("have.length", lists[0].products!.length + 1 - 2);
    cy.get("@firstListProduct").should(
      "not.contain.text",
      lists[0].products![0].collection,
    );
    cy.get("@toast")
      .should("be.visible")
      .and("contain.text", `Usunięto (2) artykuły z twojej listy.`);

    // Undo products deletion
    cy.get("@toast").within(() =>
      cy.get("button[data-testid=toast-notification-undo-btn]").click(),
    );
    cy.get("@listProducts")
      .children()
      .should("have.length", lists[0].products!.length + 1);
    cy.get("@firstListProduct").should(
      "contain.text",
      lists[0].products![0].collection,
    );
  });
});
