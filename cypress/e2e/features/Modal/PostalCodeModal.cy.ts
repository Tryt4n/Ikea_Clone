describe("Postal Code modal", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait("@getHomePage");
    cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting
  });

  it("open postal code modal", () => {
    cy.get("[data-testid=modal]").as("modal");
    cy.get("[data-testid=toast-notification]").as("toast");

    cy.get("[data-testid=postal-code-btn]").as("postalCodeBtn");

    cy.get("@postalCodeBtn").click();
    cy.get("@modal")
      .should("be.visible")
      .and("have.class", "show")
      .and("have.class", "side-modal")
      .and("contain", "Użyj swojej lokalizacji");

    cy.get("[data-testid=postal-code-input]").as("postalCodeInput");
    cy.get("[data-testid=postal-code-info]").as("postalCodeInfo");
    cy.get("button").contains("Zapisz").as("saveBtn");

    cy.get("@postalCodeInfo").should("exist");
    cy.get("@saveBtn").click();
    cy.get("[data-testid=postal-code-error]").as("postalCodeError");
    cy.get("@postalCodeError").contains(/wprowadź kod pocztowy/i);
    cy.get("@postalCodeInfo").should("not.exist");

    cy.get("@postalCodeInput").type("12345");
    cy.get("@postalCodeInput").should("have.value", "12345");
    cy.get("@saveBtn").click();
    cy.get("@postalCodeError").contains(
      /wprowadzony kod pocztowy jest nieprawidłowy/i,
    );

    cy.get("@postalCodeInput").clear();
    cy.get("@postalCodeInput").should("have.value", "");
    cy.get("@postalCodeInput").type("12-345");
    cy.get("@postalCodeInput").should("have.value", "12-345");
    cy.get("@saveBtn").click();
    cy.get("@modal").should("not.be.visible");
    cy.get("@postalCodeBtn").should("contain.text", "12-345");
    cy.get("@toast")
      .should("be.visible")
      .and("contain.text", "Wybrany przez ciebie kod pocztowy to: 12-345");
    cy.get("@toast").within(() => {
      cy.get("button").click();
    });

    cy.get("@postalCodeBtn").click();
    cy.get("@modal").should("be.visible");
    cy.get("@modal").within(() => {
      cy.get("button")
        .contains("Nie wykorzystuj kodu pocztowego")
        .should("exist");
    });
    cy.get("@postalCodeInput").should("have.value", "12-345");
    cy.get("@postalCodeInfo").should("exist");
    cy.get("@saveBtn").click();
    cy.get("@postalCodeError").contains(/wprowadzona wartość jest taka sama/i);

    cy.get("[data-testid=side-modal-close-btn]").click();
    cy.get("@modal").should("not.be.visible");

    cy.get("@postalCodeBtn").click();
    cy.get("@modal").should("be.visible");
    cy.get("@modal").within(() => {
      cy.get("button").contains("Nie wykorzystuj kodu pocztowego").click();
    });
    cy.get("@modal").should("not.be.visible");
    cy.get("@postalCodeBtn").should("contain.text", "Wpisz kod pocztowy");
  });
});
