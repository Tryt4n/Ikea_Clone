describe("Shopping cart page menu Modal", () => {
  beforeEach(() => {
    cy.fixture("shoppingCart.json").then((fixture) => {
      localStorage.setItem("shoppingCart", JSON.stringify(fixture));
    });
    cy.visit("/shoppingcart");
    cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting

    cy.get("[data-testid=modal]").as("modal");
    cy.get("[data-testid=toast-notification]").as("toast");
    cy.get("button[data-testid=shopping-cart-menu-btn]").as(
      "shoppingCartMenuBtn",
    );
  });

  it("should delete all products from shopping cart on button click", () => {
    cy.get("ul[data-testid=shopping-cart-products-list]").as("productsList");

    cy.get("@shoppingCartMenuBtn").click();
    cy.get("@modal").within(() => {
      cy.get(
        "button[data-testid=delete-all-products-from-shopping-cart-modal-btn]",
      ).as("deleteAllProductsBtn");
    });

    cy.get("@productsList").should("exist");

    cy.get("@deleteAllProductsBtn").click();

    cy.get("@toast").should("be.visible");

    cy.get("@toast").within(() => {
      cy.get("button[data-testid=toast-notification-undo-btn]").should("exist");
    });

    cy.get("@productsList").should("not.exist");

    cy.get("[data-testid=shopping-cart-empty]").should("exist");
  });

  it("should move products to newly created list", () => {
    cy.get("@shoppingCartMenuBtn").click();

    cy.get("@modal").within(() => {
      cy.get("button[data-testid=move-products-to-other-list-modal-btn]").as(
        "moveProductsToOtherListBtn",
      );
    });

    cy.get("@moveProductsToOtherListBtn").click();

    cy.get("@modal").within(() => {
      cy.get("h2").as("modalTitle");
      cy.get("ul[data-testid=modal-lists-list]").as("lists");
      cy.get("button[data-testid=side-modal-go-back-btn]").as("goBackBtn");
      cy.get("button[data-testid=create-new-list-modal-btn]").as(
        "createNewListBtn",
      );
    });

    cy.get("@modalTitle").should("contain.text", "Przenieś do innej listy");
    cy.get("@lists").should("exist");
    cy.get("@lists").children().should("have.length", 0);

    cy.get("@createNewListBtn").click();
    cy.get("@modalTitle").should("contain.text", "Nadaj swojej liście nazwę");
    cy.get("@modal").within(() => {
      cy.get("input[data-testid=new-list-name-input]").as("newListNameInput");
      cy.get("button[data-testid=save-new-list-modal-btn]").as(
        "saveNewListBtn",
      );
    });
    const newListName = "New list";
    cy.get("@newListNameInput").type(newListName);
    cy.get("@newListNameInput").should("have.value", "New list");
    cy.get("@saveNewListBtn").click();
    cy.fixture("shoppingCart.json").then((fixture) => {
      cy.get("@toast")
        .should("be.visible")
        .and(
          "contain.text",
          `Pomyślnie utworzono listę ${newListName} dla (${fixture.length}) artykułów.`,
        );
    });
    cy.get("@toast").within(() => {
      cy.get("button").click();
    });

    // Open modal again
    cy.get("@shoppingCartMenuBtn").click();
    cy.get("@moveProductsToOtherListBtn").click();
    cy.get("@lists").children().should("have.length", 1);

    cy.get("@goBackBtn").click();
    cy.get("@modalTitle").should("contain.text", "Koszyk");

    cy.get("body").type("{esc}");
    cy.get("@modal").should("not.be.visible");
  });

  it("should move products to existing list", () => {
    cy.fixture("lists.json").then((listsFixture) => {
      localStorage.setItem("favouriteLists", JSON.stringify(listsFixture));
      cy.reload();
      cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting

      cy.get("@shoppingCartMenuBtn").click();

      cy.get("@modal").within(() => {
        cy.get("button[data-testid=move-products-to-other-list-modal-btn]").as(
          "moveProductsToOtherListBtn",
        );
      });

      cy.get("@moveProductsToOtherListBtn").click();
      cy.get("@modal").within(() => {
        cy.get("ul[data-testid=modal-lists-list]").as("lists");
      });
      cy.get("@lists").should("exist");
      cy.get("@lists").children().should("have.length", listsFixture.length);

      // Add products to first list
      cy.get("@lists").children().first().click();
      cy.fixture("shoppingCart.json").then((shoppingCartFixture) => {
        cy.get("@toast")
          .should("be.visible")
          .and(
            "contain.text",
            `Produkty (${shoppingCartFixture.length}) zostały zapisane na liście ${listsFixture[0].name}.`,
          );
      });
    });
  });
});
