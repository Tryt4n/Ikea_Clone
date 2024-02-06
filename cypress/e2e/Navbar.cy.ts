import { shopsList } from "../../src/constants/shopsList";

describe("Navbar", () => {
  beforeEach(() => {
    cy.wait(300); // eslint-disable-line cypress/no-unnecessary-waiting

    cy.get("[data-testid=modal]").as("modal");
    cy.get("[data-testid=toast-notification]").as("toast");
  });

  it("open menu modal", () => {
    cy.get('button[aria-label="Otwórz Menu"]').click();
    cy.get("@modal")
      .should("be.visible")
      .and("have.class", "show")
      .and("have.class", "menu-modal");

    cy.get("@modal").within(() => {
      cy.get("nav").should("have.class", "main-menu");

      cy.contains("Produkty").click();
      cy.get("nav").should("have.class", "products-menu");
    });

    cy.get("[data-testid=menu-modal-go-back-btn]").click();
    cy.get("@modal").should("be.visible");
    cy.get("@modal").within(() => {
      cy.get("nav").should("have.class", "main-menu");
    });

    cy.get("@modal").type("{esc}");
    cy.get("@modal").should("not.be.visible").and("not.have.class", "show");

    cy.get("button").contains("Pomieszczenia").click();
    cy.get("@modal").should("be.visible");
    cy.get("@modal").within(() => {
      cy.get("nav").should("have.class", "rooms-menu");
    });
  });

  it("open login modal", () => {
    cy.get("[data-testid=login-btn]").click();

    cy.get("@modal")
      .should("be.visible")
      .and("have.class", "show")
      .and("have.class", "side-modal")
      .and("contain", "Zaloguj się");

    cy.get("[data-testid=side-modal-close-btn]").click();
    cy.get("@modal").should("not.be.visible");
  });

  it("open postal code modal", () => {
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

  it("open choose shop modal", () => {
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

  it("should properly navigate through pages", () => {
    cy.get("[data-testid=home-page-link]").as("homePageLink");
    cy.get("[data-testid=lists-page-link]").as("listsLink");
    cy.get("[data-testid=shopping-cart-link]").as("cartLink");

    cy.get("@listsLink").click();
    cy.url().should((url) => {
      expect(url).to.eq(Cypress.config().baseUrl + "/favourites");
    });

    cy.get("@cartLink").click();
    cy.url().should((url) => {
      expect(url).to.eq(Cypress.config().baseUrl + "/shoppingcart");
    });

    cy.get("@homePageLink").click();
    cy.url().should((url) => {
      expect(url).to.eq(Cypress.config().baseUrl + "/");
    });
  });
});
