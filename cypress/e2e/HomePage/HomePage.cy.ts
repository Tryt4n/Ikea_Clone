describe("Home Page", () => {
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
            cy.get("[role=tooltip]").should("be.visible");
            cy.get("[role=tooltip]").should(
              "have.attr",
              "aria-hidden",
              "false",
            );
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

  it("should handle carousel slider article", () => {
    // Have to be set 1200 for proper elements layout for testing
    cy.viewport(1200, 1400);

    cy.fixture("homePage.json").then((data) => {
      const articleId = data.articles[1].content.id;
      cy.get(`div[data-testid=carousel-slider-${articleId}]`).as(
        "carouselSlider",
      );
    });

    cy.get("@carouselSlider").within(() => {
      cy.get('div[role="button"][aria-label="Previous slide"]').as(
        "prevButton",
      );
      cy.get('div[role="button"][aria-label="Next slide"]').as("nextButton");

      cy.get("@prevButton").should("have.attr", "aria-disabled", "true");
      cy.get("@prevButton").should("have.attr", "tabindex", "-1");
      cy.get("@nextButton").should("have.attr", "aria-disabled", "false");
      cy.get("@nextButton").should("have.attr", "tabindex", "0");

      cy.get("@nextButton").click();

      cy.get("@prevButton").should("have.attr", "aria-disabled", "false");
      cy.get("@prevButton").should("have.attr", "tabindex", "0");
      cy.get("@nextButton").should("have.attr", "aria-disabled", "false");
      cy.get("@nextButton").should("have.attr", "tabindex", "0");

      cy.get("@nextButton").click();

      cy.get("@prevButton").should("have.attr", "aria-disabled", "false");
      cy.get("@prevButton").should("have.attr", "tabindex", "0");
      cy.get("@nextButton").should("have.attr", "aria-disabled", "true");
      cy.get("@nextButton").should("have.attr", "tabindex", "-1");

      cy.get("@prevButton").click();

      cy.get("@prevButton").should("have.attr", "aria-disabled", "false");
      cy.get("@prevButton").should("have.attr", "tabindex", "0");
      cy.get("@nextButton").should("have.attr", "aria-disabled", "false");
      cy.get("@nextButton").should("have.attr", "tabindex", "0");

      cy.get("@prevButton").click();

      cy.get("@prevButton").should("have.attr", "aria-disabled", "true");
      cy.get("@prevButton").should("have.attr", "tabindex", "-1");
      cy.get("@nextButton").should("have.attr", "aria-disabled", "false");
      cy.get("@nextButton").should("have.attr", "tabindex", "0");
    });
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
  });
});
