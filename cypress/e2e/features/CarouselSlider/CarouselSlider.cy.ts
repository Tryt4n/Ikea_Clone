describe("Carousel slider", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait("@getHomePage");
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
});
