describe("Collection products on list on image background", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait("@getHomePage");
  });

  it("should show additional informations of products in main article", () => {
    cy.get("[data-testid=collection-list]").first().as("collectionList");

    cy.fixture("homePage.json").then((fixture) => {
      cy.get("@collectionList")
        .children()
        .should("have.length", fixture.articles[0].content.products.length);

      cy.get("@collectionList")
        .children()
        .each(($child) => {
          cy.wrap($child).trigger("mouseover");
          cy.wrap($child).within(() => {
            cy.get("[role=tooltip]")
              .should("be.visible")
              .and("have.attr", "aria-hidden", "false");
          });
        });

      cy.get("@collectionList").children().first().trigger("mouseover");
      cy.get("@collectionList")
        .children()
        .first()
        .within(() => {
          cy.get("[role=tooltip]").click();
        });

      cy.url().should((url) => {
        expect(url).to.eq(
          Cypress.config().baseUrl +
            fixture.articles[0].content.products[0].productLink,
        );
      });

      cy.go("back");
    });
  });
});
