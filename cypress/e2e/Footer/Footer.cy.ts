import { footerLists } from "../../../src/constants/footerLists";

describe("Footer", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.wait("@getHomePage");
  });

  it("should properly handle accordions on mobile view", () => {
    cy.viewport(899, 1400);

    cy.get("[data-testid=footer-accordions]").as("accordionsContainer");

    cy.get("@accordionsContainer")
      .children()
      .should("have.length", footerLists.length);

    cy.get("@accordionsContainer").within(() => {
      cy.get("[role=region]").as("accordionsContent");
    });

    cy.get("@accordionsContent").each(($accordion) => {
      cy.wrap($accordion).should("not.be.visible");
    });

    cy.get("@accordionsContainer").children().first().as("firstAccordion");
    cy.get("@accordionsContainer").children().eq(1).as("secondAccordion");

    cy.get("@firstAccordion").within(() => {
      cy.get("button").as("firstAccordionButton");
      cy.get("[role=region]").as("firstAccordionContent");

      cy.get("@firstAccordionButton").should(
        "have.attr",
        "aria-expanded",
        "false",
      );

      // Open the first accordion
      cy.get("@firstAccordionButton").click();
      cy.get("@firstAccordionButton").should(
        "have.attr",
        "aria-expanded",
        "true",
      );
      cy.get("@firstAccordionContent").should("be.visible");
      cy.get("@accordionsContent").each((accordion, index) => {
        if (index !== 0) {
          cy.wrap(accordion).should("not.be.visible");
        }
      });
    });

    cy.get("@secondAccordion").within(() => {
      cy.get("button").as("secondAccordionButton");
      cy.get("[role=region]").as("secondAccordionContent");

      // Open the second accordion
      cy.get("@secondAccordionButton").click();
      cy.get("@secondAccordionButton").should(
        "have.attr",
        "aria-expanded",
        "true",
      );
      cy.get("@secondAccordionButton").should("be.visible");
      cy.get("@accordionsContent").each(($accordion, index) => {
        if (index !== 1) {
          cy.wrap($accordion).should("not.be.visible");
        }
      });

      // Close the second accordion
      cy.get("@secondAccordionButton").click();
      cy.get("@secondAccordionButton").should(
        "have.attr",
        "aria-expanded",
        "false",
      );
    });
    cy.get("@accordionsContent").each(($accordion) => {
      cy.wrap($accordion).should("not.be.visible");
    });
  });
});
