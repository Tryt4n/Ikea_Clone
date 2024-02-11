import { FavouritesListType } from "../../../../src/context/AppContext/types/FavouritesListType";

describe("List page undo action on Toast button click", () => {
  let lists: FavouritesListType[] = [];

  before(() => {
    cy.fixture("lists.json").then((data) => (lists = data));
  });

  it("should undo deletion of product in list", () => {
    localStorage.setItem("favouriteLists", JSON.stringify(lists));
    cy.visit(`/favourites/${lists[0].id}`);

    cy.get("[data-testid=toast-notification]").as("toast");

    cy.get("[data-testid=toast-notification]").as("toast");
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
});
