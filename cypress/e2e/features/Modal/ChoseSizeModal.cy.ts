describe("Chose size modal", () => {
  beforeEach(() => {
    cy.visit("/products/korken/sloik-z-pokrywka/szklo-bezbarwne/50213546");
    cy.wait("@getProductPage");
    cy.wait(500); // eslint-disable-line cypress/no-unnecessary-waiting
  });

  it("should open chose size modal", () => {
    cy.get("[data-testid=modal]").as("modal");
    cy.get("[data-testid=modal-control-btn-size]").as("modalControlBtnSize");

    cy.get("@modalControlBtnSize").click();
    cy.get("@modal")
      .should("be.visible")
      .and("have.class", "show")
      .and("have.class", "side-modal")
      .and("have.attr", "open");

    cy.get("@modal").within(() => {
      cy.get("h2").should("contain.text", "Wybierz rozmiar");

      cy.fixture("productPage.json").then((fixture) => {
        cy.get("[data-testid=modal-product-size]").as("productSizes");

        cy.get("@productSizes").should(
          "have.length",
          Object.keys(fixture.relatedProducts.sizes).length,
        );

        cy.get("@productSizes").each(($child) => {
          if ($child.text().includes(fixture.size)) {
            cy.wrap($child).should("have.prop", "tagName").and("eq", "DIV");
          } else {
            cy.wrap($child).should("have.prop", "tagName").and("eq", "A");
          }
        });

        cy.get("@productSizes").first().click();
        cy.url().should((url) => {
          expect(url).to.eq(
            Cypress.config().baseUrl +
              `/products/korken/sloik-z-pokrywka/szklo-bezbarwne/${fixture.relatedProducts.sizes[Object.keys(fixture.relatedProducts.sizes)[0]]}`,
          );
        });
      });
    });
  });
});
