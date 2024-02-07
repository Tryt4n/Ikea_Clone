describe("Navbar", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait("@getHomePage");
  });

  it("should properly navigate through pages", () => {
    cy.get("[data-testid=home-page-link]").as("homePageLink");
    cy.get("[data-testid=lists-page-link]").as("listsLink");
    cy.get("[data-testid=shopping-cart-link]").as("cartLink");

    cy.get("@listsLink").click();
    cy.url().should((url) => {
      expect(url).to.eq(Cypress.config().baseUrl + "/favourites");
    });

    cy.get("@cartLink").click();
    cy.url().should((url) => {
      expect(url).to.eq(Cypress.config().baseUrl + "/shoppingcart");
    });

    cy.get("@homePageLink").click();
    cy.url().should((url) => {
      expect(url).to.eq(Cypress.config().baseUrl + "/");
    });
  });
});
