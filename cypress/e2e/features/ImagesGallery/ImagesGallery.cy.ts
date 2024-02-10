describe("Images gallery", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait("@getHomePage");
    cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting
  });

  it("should handle images gallery behavior", () => {
    cy.get("[data-testid=show-more-images-in-gallery-btn]").as(
      "showMoreImagesButton",
    );
    cy.get("[data-testid=images-gallery-container]").as("gallery");

    cy.get("@showMoreImagesButton")
      .invoke("text")
      .then((text) => {
        const match = text.match(/\d+/); // Find a number in the text
        if (match) {
          const expectedChildrenCount = parseInt(match[0], 10); // Convert the found number to an integer

          cy.get("@gallery")
            .children()
            .then((children) => {
              let initialChildrenCount = children.length;

              cy.get("@gallery")
                .children()
                .should("have.length", expectedChildrenCount);

              cy.get("@showMoreImagesButton").click();

              cy.get("@gallery")
                .children()
                .should(
                  "have.length",
                  initialChildrenCount + expectedChildrenCount,
                );
              initialChildrenCount =
                initialChildrenCount + expectedChildrenCount;
            });
        }
      });

    // Open modal
    cy.get("@gallery").children().first().click();
    cy.get("[data-testid=modal]").should("be.visible");
  });
});
