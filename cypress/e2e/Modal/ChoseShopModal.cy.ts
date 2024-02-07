import { shopsList } from "../../../src/constants/shopsList";

describe("Chose shop modal", () => {
  it("open choose shop modal", () => {
    cy.wait(300); // eslint-disable-line cypress/no-unnecessary-waiting
    cy.get("[data-testid=modal]").as("modal");
    cy.get("[data-testid=toast-notification]").as("toast");

    cy.get("[data-testid=choose-shop-btn]").as("chooseShopBtn");

    cy.get("@chooseShopBtn").click();
    cy.get("@modal")
      .should("be.visible")
      .and("have.class", "show")
      .and("have.class", "side-modal")
      .and("contain", "Znajdź swój preferowany sklep");

    cy.get("[data-testid=postal-code-input]").as("postalCodeInput");
    cy.get("[data-testid=postal-code-checkbox]").as("postalCodeCheckbox");
    cy.get("[data-testid=postal-code-checkbox-label]").as(
      "postalCodeCheckboxLabel",
    );
    cy.get("button").contains("Zobacz pełną listę sklepów").as("allShopsBtn");

    cy.get("@postalCodeCheckbox").should("not.be.checked");
    cy.get("@postalCodeInput").type("12-345");
    cy.get("@postalCodeInput").should("have.value", "12-345");
    cy.get("@postalCodeCheckboxLabel").click();
    cy.get("button").contains("Znajdź preferowany sklep").click();
    cy.get("@postalCodeCheckbox").should("be.checked");

    cy.get("@toast")
      .should("be.visible")
      .and("contain.text", "Wybrany przez ciebie kod pocztowy to: 12-345");
    cy.get("@toast").within(() => {
      cy.get("button").click();
    });
    cy.get("@modal").should("not.be.visible");

    cy.get("@chooseShopBtn").click();
    cy.get("@postalCodeInput").should("have.value", "12-345");
    cy.get("@postalCodeCheckbox").should("be.checked");
    cy.get("@postalCodeCheckboxLabel").click();
    cy.get("@postalCodeCheckbox").should("not.be.checked");
    cy.get("@allShopsBtn").click();
    cy.get("@modal").should("contain", "Wybierz swój preferowany sklep");

    cy.get("[data-testid=modal-preffered-shops-list]").as("shopsList");
    cy.get("[data-testid=modal-shop-search-input]").as("shopSearchInput");
    cy.get("@shopsList").find("li").should("have.length", shopsList.length);

    cy.get("@shopSearchInput").type("warszawa");
    cy.get("@shopsList").find("li").should("have.length", 2);

    cy.get("@shopSearchInput").clear();
    cy.get("@shopSearchInput").type("invalid value");
    cy.get("em").contains(
      "Niestety, nie udało nam się znaleźć sklepu IKEA na podstawie tego, co zostało wpisane.",
    );

    cy.get("@shopSearchInput").clear();
    cy.get("@shopSearchInput").type("bydgoszcz");
    cy.get("@shopsList").find("li").should("have.length", 1).click();
    cy.get("@modal").should("contain", "IKEA Bydgoszcz");
    cy.get("[data-testid=side-modal-close-btn]").click();
    cy.get("@modal").should("not.be.visible");

    cy.get("@chooseShopBtn")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("Bydgoszcz");
      });
  });
});
