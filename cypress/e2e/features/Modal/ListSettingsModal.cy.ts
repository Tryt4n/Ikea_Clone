describe("List Settings Modal", () => {
  beforeEach(() => {
    cy.fixture("lists.json").then((fixture) => {
      localStorage.setItem("favouriteLists", JSON.stringify(fixture));
    });
    cy.visit("/favourites");
    cy.wait(500);

    cy.get("[data-testid=modal]").as("modal");
    cy.get("[data-testid=toast-notification]").as("toast");
    cy.get("button[data-testid=main-list-control-menu-btn]").as(
      "mainListControlMenuBtn",
    );
  });

  it("should handle list name change", () => {
    cy.get("@mainListControlMenuBtn").click();
    cy.get("@modal")
      .should("be.visible")
      .and("have.class", "show")
      .and("have.class", "side-modal")
      .and("have.attr", "open");
    cy.get("@modal").within(() => {
      cy.get("h2").as("modalTitle");
      cy.get("button[data-testid=change-list-name-modal-btn]").as(
        "changeListNameBtn",
      );
    });
    cy.get("@modalTitle").should("contain.text", "Ustawienia");

    cy.get("@changeListNameBtn").click();
    cy.get("@modalTitle").should("contain.text", "Zmień nazwę listy");

    cy.get("@modal").within(() => {
      cy.get("input[data-testid=new-list-name-input]").as("nameInput");
      cy.get("button[data-testid=save-new-list-modal-btn]").as("saveBtn");
    });

    cy.fixture("lists.json").then((fixture) => {
      cy.get("@nameInput").should("have.value", fixture[0].name);
    });

    // Save without changes
    cy.get("@saveBtn").click();

    cy.get("@modal").within(() => {
      cy.get("[data-testid=list-error-message]").as("errorMessage");
    });

    cy.get("@errorMessage").should("be.visible");

    // Save with input without any value
    cy.get("@nameInput").clear();
    cy.get("@saveBtn").click();
    cy.get("@modal").should("be.visible");
    cy.get("@errorMessage").should("not.be.visible");

    // Save with new name
    const typedNewName = "New list name";
    cy.get("@nameInput").type(typedNewName);
    cy.get("@nameInput").should("have.value", typedNewName);
    cy.get("@saveBtn").click();
    cy.get("@modal").should("not.be.visible");
    cy.get("@toast")
      .should("be.visible")
      .and(
        "contain.text",
        `Pomyślnie zmieniono nazwę listy na ${typedNewName}.`,
      );
    cy.get("@toast").within(() => cy.get("button").click());

    // Check if the input has the new value after the modal is closed
    cy.get("@mainListControlMenuBtn").click();
    cy.get("@changeListNameBtn").click();
    cy.get("@nameInput").should("have.value", typedNewName);

    cy.get("@modal").within(() =>
      cy.get("button[data-testid=side-modal-go-back-btn]").click(),
    );
    cy.get("@modalTitle").should("contain.text", "Ustawienia");
    cy.get("body").type("{esc}");
    cy.get("@modal").should("not.be.visible");
  });

  it("should handle list deletion", () => {
    cy.get("[data-testid=favourite-list]").as("favouriteLists");
    cy.fixture("lists.json").then((fixture) => {
      cy.get("@favouriteLists").should("have.length", fixture.length);

      cy.get("@mainListControlMenuBtn").click();
      cy.get("@modal")
        .should("be.visible")
        .and("have.class", "show")
        .and("have.class", "side-modal")
        .and("have.attr", "open");
      cy.get("@modal").within(() => {
        cy.get("h2").as("modalTitle");
        cy.get("button[data-testid=delete-list-modal-btn]").as("deleteListBtn");
      });
      cy.get("@modalTitle").should("contain.text", "Ustawienia");
      cy.get("@deleteListBtn").click();
      cy.get("@modalTitle").should("contain.text", "Usuń swoją listę");

      cy.get("@modal").within(() => {
        cy.get("button[data-testid=delete-list-confirmation-modal-btn]").as(
          "deleteListConfirmationBtn",
        );
        cy.get("input[data-testid=delete-list-checkbox]").as(
          "deleteListCheckbox",
        );
        cy.get("label[data-testid=delete-list-checkbox-label]").as(
          "deleteListCheckboxLabel",
        );
        cy.get("[data-testid=delete-list-checkbox-error-message]").as(
          "deleteListErrorMessage",
        );
      });

      cy.get("@deleteListCheckbox").should("not.be.checked");

      // Try to delete the list without checking the checkbox
      cy.get("@deleteListErrorMessage").should("be.not.visible");
      cy.get("@deleteListConfirmationBtn").click();
      cy.get("@deleteListErrorMessage").should("be.visible");

      // Check the checkbox and delete the list
      cy.get("@deleteListCheckboxLabel").click();
      cy.get("@deleteListCheckbox").should("be.checked");
      cy.get("@deleteListErrorMessage").should("be.not.visible");
      cy.get("@deleteListConfirmationBtn").click();
      cy.get("@favouriteLists").should("have.length", fixture.length - 1);
      cy.get("@modal").should("not.be.visible");
      cy.get("@toast")
        .should("be.visible")
        .and("contain.text", `Pomyślnie usunięto ${fixture[0].name}.`);
    });
  });

  it("should handle move products to other list", () => {
    cy.get("[data-testid=favourite-list]").children().first().as("mainList");
    cy.get("@mainList").within(() => {
      cy.get("ul").as("mainListProductsList");
    });
    cy.fixture("lists.json").then((fixture) => {
      cy.get("@mainListProductsList")
        .children()
        .should("have.length", fixture[0].products.length);

      cy.get("@mainListControlMenuBtn").click();
      cy.get("@modal")
        .should("be.visible")
        .and("have.class", "show")
        .and("have.class", "side-modal")
        .and("have.attr", "open");
      cy.get("@modal").within(() => {
        cy.get("h2").as("modalTitle");
        cy.get("button[data-testid=move-to-other-list-modal-btn]").as(
          "moveToOtherListBtn",
        );
      });
      cy.get("@modalTitle").should("contain.text", "Ustawienia");

      cy.get("@moveToOtherListBtn").click();
      cy.get("@modalTitle").should("contain.text", "Przenieś do innej listy");

      cy.get("ul[data-testid=modal-lists-list]").as("lists");
      cy.get("@lists")
        .children()
        .should("have.length", fixture.length - 1);

      cy.get("@lists").children().first().as("firstList");
      cy.get("@firstList").within(() => {
        cy.get("[data-testid=list-name-modal]").then(($listName) => {
          const listName = $listName.text();
          cy.get("@firstList").first().click();
          cy.get("@modal").should("not.be.visible");
          cy.get("@toast")
            .should("be.visible")
            .and(
              "contain.text",
              `Pomyślnie przeniesiono produkty z listy ${fixture[0].name} na listę ${listName}.`,
            );
        });
      });

      cy.get("@mainListProductsList").should("not.exist");
    });
  });
});
