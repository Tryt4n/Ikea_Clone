describe("Product Page", () => {
  beforeEach(() => {
    cy.visit(
      "/products/some-collection-name/some-product-name/some-variant/123456",
    );
    cy.wait("@getProductPage");
  });

  it("should load image gallery on larger devices", () => {
    // Make sure that is at least 900px wide
    cy.viewport(900, 800);

    cy.get("[data-testid=product-image-gallery]").as("imageGallery");
    cy.get("@imageGallery").within(() => {
      cy.fixture("productPage.json").then((fixture) => {
        const imagesLength = Object.keys(fixture.images).length;

        cy.get("[data-testid=product-image-gallery-item]").as("galleryItems");
        cy.get("@galleryItems").should("have.length", 8);

        cy.get("[data-testid=toggle-show-more-images-btn]").as(
          "toggleShowMoreBtn",
        );
        cy.get("@toggleShowMoreBtn").click();

        cy.get("@galleryItems").should("have.length", imagesLength);
      });
    });
  });
});
