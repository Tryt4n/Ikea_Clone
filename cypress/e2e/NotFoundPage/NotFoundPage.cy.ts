describe("Not Found Page", () => {
  it("should handle non-existing page", () => {
    cy.visit("/non-existing-page");

    cy.get("h2").should("contain.text", "Ups... Coś poszło nie tak!");

    cy.get("[data-testid=not-found-page-link]").click();
    cy.url().should((url) => {
      expect(url).to.eq(Cypress.config().baseUrl + "/");
    });
  });
});
