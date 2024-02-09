describe("Product Page", () => {
  beforeEach(() => {
    cy.visit("/products/korken/sloik-z-pokrywka/szklo-bezbarwne/50213546");
    cy.wait("@getProductPage");
  });

  it("should load image gallery on larger devices", () => {
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

  it("should load image gallery as carousel slider on smaller devices", () => {
    cy.viewport(899, 800);
    cy.reload();

    cy.get("[data-testid=product-image-gallery]").as("imageGallery");

    cy.get("@imageGallery").within(() => {
      const productImageItemSizeWithGap = 850;

      cy.get("[data-testid=product-image-gallery-item]").each(
        ($child, index) => {
          cy.wrap($child).then(($el) => {
            const bounding = $el[0].getBoundingClientRect();
            const condition = index === 0 ? "lessThan" : "greaterThan";
            expect(bounding.left).to[condition](productImageItemSizeWithGap);
          });
        },
      );
    });
  });

  it("should play/pause video when play/pause button is clicked", () => {
    cy.get("[data-testid=product-video]").as("productVideo");
    cy.get("[data-testid=product-video-control-btn]").as("videoBtnControl");

    cy.get("@videoBtnControl").within(() => {
      cy.get("svg[data-testid=play-icon]").as("playIcon");
    });

    cy.get("@playIcon").should("exist");
    cy.get("@playIcon").should("be.visible");

    cy.get("@videoBtnControl").click();
    cy.get("@playIcon").should("not.exist");
    cy.get("@videoBtnControl").within(() => {
      cy.get("svg[data-testid=pause-icon]").as("pauseIcon");
    });
    cy.get("@pauseIcon").should("exist");

    // Wait for .play() action to be called on the video element before the .pause() action is called
    cy.wait(300); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.get("@videoBtnControl").click();
    cy.get("@pauseIcon").should("not.exist");
    cy.get("@playIcon").should("exist");
  });

  it("should change main image when thumbnail is hovered", () => {
    cy.get("[data-testid=product-image-gallery-item]")
      .children()
      .first()
      .as("mainImage");
    cy.get("[data-testid=modal-control-btn-color]").as("modalControlBtnColor");
    cy.get("[data-testid=product-thumbnails-container]").as(
      "thumbnailsContainer",
    );

    cy.fixture("productPage.json").then((fixture) => {
      cy.get("@mainImage")
        .should("have.attr", "src")
        .and("include", fixture.thumbnails.variant_1);

      cy.get("@modalControlBtnColor").should(
        "contain.text",
        fixture.variantName,
      );

      cy.get("@thumbnailsContainer")
        .children()
        .each(($child, index) => {
          if (index === 0) {
            cy.wrap($child).should("have.class", "active");
            cy.wrap($child).should("have.prop", "tagName").and("eq", "DIV");
          } else {
            cy.wrap($child).should("have.prop", "tagName").and("eq", "A");
          }
        });

      // Hover over second thumbnail
      cy.get("@thumbnailsContainer").children().eq(1).trigger("mouseover");
      cy.get("@modalControlBtnColor").should(
        "contain.text",
        fixture.variantsName[1],
      );
      cy.get("@mainImage")
        .should("have.attr", "src")
        .and("include", fixture.thumbnails.variant_2);

      // Hover over third thumbnail
      cy.get("@thumbnailsContainer").children().eq(2).trigger("mouseover");
      cy.get("@modalControlBtnColor").should(
        "contain.text",
        fixture.variantsName[2],
      );
      cy.get("@mainImage")
        .should("have.attr", "src")
        .and("include", fixture.thumbnails.variant_3);

      // Unhover all thumbnails
      cy.get("@thumbnailsContainer").children().eq(2).trigger("mouseout");
      cy.get("@mainImage")
        .should("have.attr", "src")
        .and("include", fixture.thumbnails.variant_1);

      cy.get("@modalControlBtnColor").should(
        "contain.text",
        fixture.variantName,
      );
    });
  });

  it("should open modal when add to favourite list button is clicked", () => {
    cy.get("[data-testid=modal]").as("modal");
    cy.get("[data-testid=toast-notification]").as("toast");
    cy.get("[data-testid=add-to-wishlist-btn]").as("addToWishListBtn");

    cy.get("@addToWishListBtn").click();
    cy.fixture("productPage.json").then((fixture) => {
      cy.get("@toast")
        .should("be.visible")
        .and(
          "contain.text",
          `${fixture.collection} został zapisany na liście Moja lista.`,
        );
      cy.get("@toast").within(() => {
        cy.get("button").click();
      });
    });

    cy.get("@addToWishListBtn").click();
    cy.get("@modal").should("be.visible");
    cy.get("body").type("{esc}");
    cy.get("@modal").should("not.be.visible");
  });

  it("should add product to cart when add to cart button is clicked", () => {
    cy.get("[data-testid=toast-notification]").as("toast");
    cy.get("[data-testid=add-to-cart-btn]").as("addToCartBtn");
    cy.get("[data-testid=quantity-input]").within(() => {
      cy.get("input").as("quantityInput");
    });

    cy.get("@quantityInput").should("have.value", "1");

    cy.get("@addToCartBtn").click();
    cy.fixture("productPage.json").then((fixture) => {
      cy.get("@toast")
        .should("be.visible")
        .and("contain.text", `${fixture.collection} dodano do koszyka.`);
      cy.get("@toast").within(() => {
        cy.get("button").click();
      });
    });
    cy.get("[data-testid=shopping-cart-badge]").as("shoppingCartBadge");
    cy.get("@shoppingCartBadge").should("contain.text", "1");

    // Add more than one product to cart
    cy.get("@quantityInput").should("have.value", "1");
    cy.get("@addToCartBtn").should("contain.text", "Dodaj do koszyka");
    cy.get("@quantityInput").type("10");
    cy.get("@quantityInput").should("have.value", "10");
    cy.get("@addToCartBtn").should("contain.text", "Dodaj 10 szt. do koszyka");
    cy.get("@addToCartBtn").click();
    cy.get("@toast").should("be.visible");
    cy.get("@shoppingCartBadge").should("contain.text", "11");
  });

  it("should handle more information button click", () => {
    cy.get("[data-testid=additional-product-description-long]").as(
      "descriptionContainer",
    );
    cy.get("button[data-testid=show-more-btn]").as("showMoreBtn");
    cy.get("[data-testid=product-page-long-description-sections]").as(
      "sectionsContainer",
    );

    cy.get("@showMoreBtn").should("contain.text", "Dowiedz się więcej");

    cy.get("@sectionsContainer").within(() => {
      cy.get("section").as("sections");

      cy.get("@sections").each(($section) => {
        cy.wrap($section).should("not.be.visible");
      });

      cy.get("@showMoreBtn").click();
      cy.get("@showMoreBtn").should("contain.text", "Pokaż mniej");

      cy.get("@sections").each(($section) => {
        cy.wrap($section).should("be.visible");
      });

      cy.get("@showMoreBtn").scrollIntoView();
      cy.get("@showMoreBtn").click();
      cy.get("@showMoreBtn").should("contain.text", "Dowiedz się więcej");

      cy.get("@descriptionContainer").then(($container) => {
        const navbarHeight = 90;
        const containerTop = $container.offset()!.top - navbarHeight;
        cy.window().then(($window) => {
          expect(containerTop).to.be.at.most($window.scrollY);
        });
      });
    });
  });
});
