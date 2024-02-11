import { FavouritesListType } from "../../../../src/context/AppContext/types/FavouritesListType";

describe("Manage Products In List Modal", () => {
  let lists: FavouritesListType[] = [];

  before(() => {
    cy.fixture("lists.json").then((data) => (lists = data));
  });

  beforeEach(() => {
    localStorage.setItem("favouriteLists", JSON.stringify(lists));
    cy.visit(`/favourites/${lists[0].id}`);

    cy.wait(500);

    cy.get("[data-testid=modal]").as("modal");
    cy.get("[data-testid=toast-notification]").as("toast");
  });

  it("should move product when manage list has only one product", () => {
    cy.get("ul[data-testid=list-products-list]").as("listProducts");
    cy.get("input[data-testid=list-product-checkbox]")
      .first()
      .check({ force: true });

    cy.get("@listProducts")
      .children()
      .should("have.length", lists[0].products!.length + 1);

    cy.get("[data-testid=list-manage-selected-products]").within(() =>
      cy.get("button[data-testid=manage-selected-products-btn]").click(),
    );

    cy.get("@modal")
      .should("be.visible")
      .and("have.class", "show")
      .and("have.class", "side-modal")
      .and("have.attr", "open");

    cy.get("@modal").within(() => {
      cy.get("h2").as("modalTitle");
      cy.get("@modalTitle").should("have.text", "Zarządzaj swoimi wyborami");
      cy.get("ul").children().should("have.length", 1);
      cy.get("img").should("have.length", 1);
      cy.get("img")
        .should("have.attr", "src")
        .and("contain", lists[0].products![0].images.main);

      cy.get(
        "button[data-testid=move-selected-products-to-other-list-modal-btn]",
      ).click();
      cy.get("@modalTitle").should("have.text", "Przenieś do innej listy");
      cy.get("button[data-testid=modal-list-item]").last().click();
    });
    cy.get("@listProducts")
      .children()
      .should("have.length", lists[0].products!.length + 1 - 1);

    cy.get("@toast")
      .should("be.visible")
      .and(
        "contain.text",
        `Pomyślnie przeniesiono ${lists[0].products![0].collection} na listę Moja lista.`,
      );
    cy.get("@toast").within(() => cy.get("a").click());
    cy.url().should(
      "eq",
      `${Cypress.config().baseUrl}/favourites/${lists[1].id}`,
    );
    cy.go("back");
    cy.get("@listProducts")
      .children()
      .should("have.length", lists[0].products!.length + 1 - 1);
  });

  it("should move multiple products when manage list has more than one product", () => {
    cy.get("ul[data-testid=list-products-list]").as("listProducts");
    cy.get("input[data-testid=list-product-checkbox]").as(
      "listProductCheckboxes",
    );

    cy.get("@listProducts")
      .children()
      .should("have.length", lists[0].products!.length + 1);

    cy.get("@listProductCheckboxes").first().click({ force: true });
    cy.get("@listProductCheckboxes").eq(1).click({ force: true });
    cy.get("@listProductCheckboxes").eq(2).click({ force: true });

    cy.get("[data-testid=list-manage-selected-products]").within(() =>
      cy.get("button[data-testid=manage-selected-products-btn]").click(),
    );

    cy.get("@modal")
      .should("be.visible")
      .and("have.class", "show")
      .and("have.class", "side-modal")
      .and("have.attr", "open");

    cy.get("@modal").within(() => {
      cy.get("ul").children().should("have.length", 3);
      cy.get("img")
        .should("have.length", 3)
        .each((img, index) => {
          cy.wrap(img)
            .should("have.attr", "src")
            .and("contain", lists[0].products![index].images.main);
        });

      cy.get(
        "button[data-testid=move-selected-products-to-other-list-modal-btn]",
      ).click();
      cy.get("button[data-testid=modal-list-item]").last().click();
    });
    cy.get("@listProducts")
      .children()
      .should("have.length", lists[0].products!.length + 1 - 3);

    cy.get("@toast")
      .should("be.visible")
      .and(
        "contain.text",
        `Artykuły w ilości: (3) zostały przeniesione na listę Moja lista.`,
      );
    cy.get("@toast").within(() => cy.get("a").click());
    cy.url().should(
      "eq",
      `${Cypress.config().baseUrl}/favourites/${lists[1].id}`,
    );
    // Check if list where products were moved contains the products
    cy.get("@listProducts")
      .children()
      .should("have.length", lists[1].products!.length + 1 + 3);

    cy.go("back");
    cy.get("@listProducts")
      .children()
      .should("have.length", lists[0].products!.length + 1 - 3);
  });

  it("should delete product from list when manage list has only one product", () => {
    cy.get("ul[data-testid=list-products-list]").as("listProducts");
    cy.get("input[data-testid=list-product-checkbox]")
      .first()
      .check({ force: true });

    cy.get("@listProducts")
      .children()
      .should("have.length", lists[0].products!.length + 1);

    cy.get("@listProducts").first().as("firstListProduct");

    cy.get("[data-testid=list-manage-selected-products]").within(() =>
      cy.get("button[data-testid=manage-selected-products-btn]").click(),
    );

    cy.get("@modal")
      .should("be.visible")
      .and("have.class", "show")
      .and("have.class", "side-modal")
      .and("have.attr", "open");

    cy.get("@modal").within(() => {
      cy.get(
        "button[data-testid=delete-selected-products-from-list-btn]",
      ).click();
    });

    cy.get("@listProducts")
      .children()
      .should("have.length", lists[0].products!.length + 1 - 1);
    cy.get("@firstListProduct").should(
      "not.contain.text",
      lists[0].products![0].collection,
    );
    cy.get("@toast")
      .should("be.visible")
      .and(
        "contain.text",
        `${lists[0].products![0].collection} został usunięty z twojej listy.`,
      );
  });

  it("should delete multiple products from list when manage list has more than one product", () => {
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
    cy.get("@listProductCheckboxes").eq(2).click({ force: true });

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
      .should("have.length", lists[0].products!.length + 1 - 3);
    cy.get("@firstListProduct").should(
      "not.contain.text",
      lists[0].products![0].collection,
    );
    cy.get("@toast")
      .should("be.visible")
      .and("contain.text", `Usunięto (3) artykuły z twojej listy.`);
  });
});
