describe("Scroll To Top Button", () => {
  beforeEach(() => {
    cy.visit(
      "/products/some-collection-name/some-product-name/some-variant/123456",
    );
    cy.wait("@getProductPage");
    cy.wait(500);
  });

  it("should scroll the page on scroll to top button click", () => {
    cy.get("[data-testid=back-to-top-btn]").as("backToTopButton");

    cy.get("@backToTopButton").should("exist");
    cy.get("@backToTopButton").should("not.be.visible");

    // Scroll page
    cy.window().then((win) => {
      win.scrollBy(0, win.innerHeight);
    });

    // Check if button is visible
    cy.get("@backToTopButton").should("be.visible");

    // Click button
    cy.get("@backToTopButton").click();
    cy.window().its("scrollY").should("eq", 0);
    cy.get("@backToTopButton").should("not.be.visible");
  });
});
