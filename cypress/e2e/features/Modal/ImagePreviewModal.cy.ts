describe("Image preview modal", () => {
  beforeEach(() => {
    cy.visit("/products/korken/sloik-z-pokrywka/szklo-bezbarwne/50213546");
    cy.wait("@getProductPage");
    cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting

    cy.get("[data-testid=modal]").as("modal");
    cy.get("[data-testid=product-image-gallery-item]").as(
      "productImageGalleryItems",
    );
  });

  it("should open image preview modal", () => {
    // Click second image
    const secondImageIndex = 1;
    cy.get("@productImageGalleryItems").eq(secondImageIndex).click();
    cy.get("@modal")
      .should("be.visible")
      .and("have.class", "show")
      .and("have.class", "image-modal")
      .and("have.attr", "open");

    cy.get("@modal").within(() => {
      cy.get("img").as("modalImages");
      cy.get("video").as("modalVideos");
      cy.get('div[role="button"][aria-label="Previous slide"]').as(
        "prevButton",
      );
      cy.get('div[role="button"][aria-label="Next slide"]').as("nextButton");
    });

    cy.fixture("productPage.json").then((fixture) => {
      cy.get("@modalVideos").then(($videos) => {
        const videoCount = $videos.length;

        cy.get("@modalImages").should(
          "have.length",
          Object.keys(fixture.images).length - videoCount,
        );
      });

      cy.get("@modalImages").each(($image, index) => {
        if (!fixture.images.video) {
          cy.wrap($image)
            .should("have.attr", "src")
            .and("contain", fixture.images[Object.keys(fixture.images)[index]]);
        }

        if (index === secondImageIndex) {
          cy.wrap($image).should("be.visible");
        } else {
          cy.wrap($image).should("not.be.visible");
        }
      });

      // Click the previous button
      cy.get("@prevButton").click();
      cy.get("@modalImages").each(($image, index) => {
        if (index === secondImageIndex - 1) {
          cy.wrap($image).should("be.visible");
        } else {
          cy.wrap($image).should("not.be.visible");
        }
      });

      // Click the next button
      cy.get("@nextButton").click();
      cy.get("@modalImages").each(($child, index) => {
        if (index === secondImageIndex) {
          cy.wrap($child).should("be.visible");
        } else {
          cy.wrap($child).should("not.be.visible");
        }
      });
    });
  });

  it("should open image preview modal with video", () => {
    cy.fixture("productPage.json").then((fixture) => {
      const videoIndex = Object.keys(fixture.images).findIndex(
        (key) => key === "video",
      );

      cy.get("@productImageGalleryItems").eq(videoIndex).click("bottomLeft"); // Make sure not to click the play button

      cy.get("@modal").within(() => {
        cy.get("video").as("modalVideo");
      });

      cy.get("@modalVideo").should("be.visible").and("have.attr", "autoplay");
    });

    cy.get("body").type("{esc}");
    cy.get("@modal").should("not.be.visible");
  });
});
