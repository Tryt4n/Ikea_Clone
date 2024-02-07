describe("Image with products modal", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait("@getHomePage");
    cy.wait(300); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.get("[data-testid=modal]").as("modal");

    cy.fixture("homePage.json").then((data) => {
      const articleId = data.articles[3].content.id;
      cy.get(`div[data-testid=image-cards-collection-slider-${articleId}]`).as(
        "carouselSlider",
      );
    });

    cy.get("@carouselSlider").within(() => {
      cy.get("[data-testid=article-section]").eq(1).as("imageWithProducts");
    });
  });

  it("should open modal with products on image click", () => {
    cy.get("[data-testid=toast-notification]").as("toast");

    // Open modal with products
    cy.get("@imageWithProducts").click();
    cy.get("@modal").should("be.visible").and("contain", "Wasze wnętrza");

    cy.get("@modal").within(() => {
      cy.get("[data-testid=article-img-container]").within(() => {
        cy.get("img").should("exist");
      });
    });

    cy.get("@modal").within(() => {
      cy.get("[data-testid=image-with-products-modal-list]").as("productsList");

      cy.fixture("homePage.json").then((data) => {
        const products = data.articles[3].content.cards[1].products;

        cy.get("@productsList")
          .children()
          .should("have.length", products.length);

        cy.get("@productsList").children().first().as("firstProduct");

        cy.get("@firstProduct").within(() => {
          // Add product to cart
          cy.get("[data-testid=add-product-to-cart-btn]").click();
          cy.get("[data-testid=add-product-to-list-btn]").as(
            "addProductToList",
          );
          cy.get("[data-testid=heart-icon]").as("addProductToListIcon");
        });
        // Check if svg icon is properly styled
        cy.get("@addProductToListIcon")
          .find("path")
          .should("have.attr", "fill", "transparent")
          .should("have.attr", "stroke-width", "2");
        // Check if toast notification is visible
        cy.get("@toast").should(
          "contain.text",
          `${products[0].productHeading} dodano do koszyka.`,
        );

        // Add product to list
        cy.get("@addProductToList").click();
        cy.get("@addProductToListIcon")
          .find("path")
          .should("have.attr", "fill", "#111")
          .should("have.attr", "stroke-width", "0");
        cy.get("@toast").should(
          "contain.text",
          `${products[0].productHeading} został zapisany na liście Moja lista.`,
        );

        // Try to add product to list again
        cy.get("@addProductToList").click();
        cy.get("@modal").should("contain", "Zapisz na swojej liście");
        cy.get("@modal").within(() => {
          cy.get("[data-testid=modal-list-item]").as("modalListItem");
          cy.get("[data-testid=modal-product-list-checkbox]").as(
            "modalListItemCheckbox",
          );
          cy.get("button").contains("Stwórz listę").as("createListBtn");
        });
        cy.get("@modalListItemCheckbox").should("be.checked");

        // Uncheck product checkbox
        cy.get("@modalListItemCheckbox").click();
        cy.get("@modalListItemCheckbox").should("not.exist");

        // Add product to newly created list
        cy.get("@createListBtn").click();
        cy.get("[data-testid=new-list-name-input]").as("newListNameInput");
        cy.get("@newListNameInput").type("Moja lista");
        cy.get("@newListNameInput").should("have.value", "Moja lista");
        cy.get("@createListBtn").click();
        cy.get("[data-testid=list-error-message]").should("be.visible");
        cy.get("@newListNameInput").clear();
        cy.get("@newListNameInput").type("New list");
        cy.get("@newListNameInput").should("have.value", "New list");
        cy.get("@createListBtn").click();
        cy.get("@toast").should(
          "contain.text",
          "Pomyślnie utworzono listę New list.",
        );
        cy.get("@toast").within(() => {
          cy.get("button").click();
        });

        // Open modal with products
        cy.get("@imageWithProducts").click();
        // Check if product has proper checkbox status on list
        cy.get("@addProductToList").click();
        cy.get("@modal").within(() => {
          cy.get("[data-testid=modal-lists-list]").as("lists");
        });
        cy.get("@lists").children().should("have.length", 2);
        cy.get("@lists").children().first().as("firstList");
        cy.get("@lists").children().eq(1).as("secondList");
        cy.get("@firstList").within(() => {
          cy.get("[data-testid=modal-product-list-checkbox]").should(
            "be.checked",
          );
        });
        cy.get("@secondList").within(() => {
          cy.get("[data-testid=modal-product-list-checkbox]").should(
            "not.be.checked",
          );
          cy.get("[data-testid=modal-list-no-image]").should("exist");
        });

        // Go back to main modal
        cy.get("[data-testid=side-modal-go-back-btn]").click();

        // Go to product page
        cy.get("@firstProduct").click();
        cy.url().should((url) => {
          expect(url).to.eq(Cypress.config().baseUrl + products[0].productLink);
        });

        cy.go("back");
      });
    });
  });

  it("should assert that modal is different in mobile view", () => {
    cy.viewport(999, 1400);

    cy.get("@imageWithProducts").click();
    cy.get("@modal").should("be.visible").and("contain", "Wasze wnętrza");

    cy.get("@modal").within(() => {
      cy.get("[data-testid=article-img-container]").should("not.exist");
    });

    cy.get("body").type("{esc}");
    cy.get("@modal").should("not.be.visible");
  });
});
