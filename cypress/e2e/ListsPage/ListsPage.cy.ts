describe("Lists Page", () => {
  beforeEach(() => {
    cy.visit("/favourites");
    cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting

    cy.get("[data-testid=modal]").as("modal");
  });

  it("should render page without any lists", () => {
    cy.get("[data-testid=favourite-lists-container]").as("listsContainer");

    cy.get("article").should("have.length", 1);
    cy.get("@listsContainer").children().should("have.length", 1);

    cy.get("button[data-testid=create-new-list-btn]").click();
    cy.get("@modal").should("be.visible");

    cy.get("body").type("{esc}");
    cy.get("@modal").should("not.be.visible");
  });

  it("should render page with one list", () => {
    cy.fixture("lists.json").then((fixture) => {
      localStorage.setItem("favouriteLists", JSON.stringify([fixture[0]]));
    });
    cy.reload();

    cy.get("[data-testid=favourite-lists-container]").as("listsContainer");

    cy.get("article").should("have.length", 1);
    cy.get("@listsContainer").children().should("have.length", 2);

    cy.get("button[data-testid=main-list-control-menu-btn]").click();
    cy.get("@modal").should("be.visible");

    cy.get("body").type("{esc}");
    cy.get("@modal").should("not.be.visible");
  });

  it("should render page with multiple lists", () => {
    cy.fixture("lists.json").then((fixture) => {
      localStorage.setItem("favouriteLists", JSON.stringify(fixture));
      cy.reload();
      cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting

      cy.get("[data-testid=favourite-lists-container]").as("listsContainer");
      cy.get("[data-testid=favourite-list]").as("favouriteLists");
      cy.get("ul[data-testid=favourite-lists-other-lists]").as("otherLists");

      cy.get("article").should("have.length", 2);
      cy.get("@listsContainer").children().should("have.length", 2);
      cy.get("@favouriteLists").should("have.length", fixture.length);
      cy.get("@otherLists")
        .children()
        .should("have.length", fixture.length - 1);

      cy.get("@favouriteLists").first().click();
      cy.url().should((url) => {
        expect(url).to.eq(
          Cypress.config().baseUrl + `/favourites/${fixture[0].id}`,
        );
      });
      cy.go("back");
    });
  });
});
