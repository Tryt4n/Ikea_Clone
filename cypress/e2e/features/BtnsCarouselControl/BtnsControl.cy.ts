describe("Btns Control", () => {
  it("should handle scrolling in smaller devices", () => {
    cy.fixture("lists.json").then((lists) => {
      localStorage.setItem("favouriteLists", JSON.stringify(lists));
      cy.viewport(375, 750);
      cy.visit(`/favourites/${lists[0].id}`);

      cy.get("[data-testid=btns-control]").as("btnsControl");
      cy.get("@btnsControl").within(() => {
        cy.get("button[data-testid=prev-btn]").as("btnPrev");
        cy.get("button[data-testid=next-btn]").as("btnNext");
      });
      cy.get("[data-testid=control-btns-container]").within(() =>
        cy.get("button").as("sortingBtns"),
      );

      cy.get("@btnsControl").should("be.visible");
      cy.get("@btnPrev").should("be.disabled");
      cy.get("@btnPrev").should("have.attr", "aria-hidden", "true");
      cy.get("@btnNext").should("not.be.disabled");
      cy.get("@btnNext").should("have.attr", "aria-hidden", "false");

      cy.get("@btnNext").click();
      cy.wait(500);

      cy.get("@btnPrev").should("not.be.disabled");
      cy.get("@btnPrev").should("have.attr", "aria-hidden", "false");
      cy.get("@btnNext").should("not.be.disabled");
      cy.get("@btnNext").should("have.attr", "aria-hidden", "false");

      cy.get("@btnNext").click();
      cy.wait(500);

      cy.get("@btnPrev").should("not.be.disabled");
      cy.get("@btnPrev").should("have.attr", "aria-hidden", "false");
      cy.get("@btnNext").should("be.disabled");
      cy.get("@btnNext").should("have.attr", "aria-hidden", "true");

      cy.get("@btnPrev").click();
      cy.wait(500);

      cy.get("@btnPrev").should("not.be.disabled");
      cy.get("@btnPrev").should("have.attr", "aria-hidden", "false");
      cy.get("@btnNext").should("not.be.disabled");
      cy.get("@btnNext").should("have.attr", "aria-hidden", "false");

      cy.get("@btnPrev").click();
      cy.wait(500);

      cy.get("@btnPrev").should("be.disabled");
      cy.get("@btnPrev").should("have.attr", "aria-hidden", "true");
      cy.get("@btnNext").should("not.be.disabled");
      cy.get("@btnNext").should("have.attr", "aria-hidden", "false");
    });
  });
});
