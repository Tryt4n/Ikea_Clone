describe("Menu modal", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait("@getHomePage");
    cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting
  });

  it("open menu modal on menu button click", () => {
    cy.get("[data-testid=modal]").as("modal");

    cy.get('button[aria-label="Otwórz Menu"]').click();
    cy.get("@modal")
      .should("have.class", "show")
      .and("have.class", "menu-modal")
      .and("have.attr", "open");

    cy.get("@modal").within(() => {
      cy.get("nav").should("have.class", "main-menu");

      cy.contains("Produkty").click();
      cy.get("nav").should("have.class", "products-menu");
    });

    cy.get("[data-testid=menu-modal-go-back-btn]").click();
    cy.get("@modal")
      .should("have.class", "show")
      .and("have.class", "menu-modal")
      .and("have.attr", "open");
    cy.get("@modal").within(() => {
      cy.get("nav").should("have.class", "main-menu");
    });

    cy.get("@modal").type("{esc}");
    cy.get("@modal").should("not.be.visible").and("not.have.class", "show");
  });

  it(`open menu modal on navigation "Produkty" button click`, () => {
    cy.get("[data-testid=modal]").as("modal");

    cy.get("button").contains("Produkty").click();
    cy.get("@modal")
      .should("have.class", "show")
      .and("have.class", "menu-modal")
      .and("have.attr", "open");
    cy.get("@modal").within(() => {
      cy.get("nav").should("have.class", "products-menu");
    });
    cy.get("[data-testid=menu-modal-close-btn]").click();
    cy.get("@modal").should("not.be.visible").and("not.have.class", "show");
  });

  it(`open menu modal on navigation "Pomieszczenia" button click`, () => {
    cy.get("[data-testid=modal]").as("modal");

    cy.get("button").contains("Pomieszczenia").click();
    cy.get("@modal")
      .should("have.class", "show")
      .and("have.class", "menu-modal")
      .and("have.attr", "open");
    cy.get("@modal").within(() => {
      cy.get("nav").should("have.class", "rooms-menu");
    });
    cy.get("[data-testid=menu-modal-close-btn]").click();
    cy.get("@modal").should("not.be.visible").and("not.have.class", "show");
  });
});
