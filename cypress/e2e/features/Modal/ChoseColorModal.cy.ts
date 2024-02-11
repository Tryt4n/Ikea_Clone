describe("Chose color modal", () => {
  beforeEach(() => {
    cy.visit("/products/korken/sloik-z-pokrywka/szklo-bezbarwne/50213546");
    cy.wait("@getProductPage");
    cy.wait(500);
  });

  it("should open chose color modal", () => {
    cy.get("[data-testid=modal]").as("modal");
    cy.get("[data-testid=modal-control-btn-color]").as("modalControlBtnColor");

    cy.get("@modalControlBtnColor").click();
    cy.get("@modal")
      .should("be.visible")
      .and("have.class", "show")
      .and("have.class", "side-modal")
      .and("have.attr", "open");

    cy.get("@modal").within(() => {
      cy.get("h2").should("contain.text", "Wybierz kolor");

      cy.fixture("productPage.json").then((fixture) => {
        cy.get("[data-testid=modal-product-variant]").as("productVariants");

        cy.get("@productVariants").should(
          "have.length",
          fixture.variants.length,
        );

        cy.get("@productVariants").each(($child, index) => {
          if (index === 0) {
            cy.wrap($child).should("have.prop", "tagName").and("eq", "DIV");
          } else {
            cy.wrap($child).should("have.prop", "tagName").and("eq", "A");
          }
        });

        cy.get("@productVariants").eq(1).click();
        cy.url().should((url) => {
          expect(url).to.eq(
            Cypress.config().baseUrl +
              `/products/korken/sloik-z-pokrywka/${fixture.variants[1]}/${fixture.relatedProducts.variants[fixture.variants[1]]}`,
          );
        });
      });
    });
  });
});
