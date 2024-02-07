// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(() => {
  localStorage.clear();

  cy.intercept(
    "GET",
    "https://tryt4n.github.io/Ikea-data/server/pages/homePage.json",
    { fixture: "homePage.json" },
  ).as("getHomePage");

  cy.intercept(
    "GET",
    /https:\/\/tryt4n\.github\.io\/Ikea-data\/server\/products\/.*/,
    { fixture: "productPage.json" },
  ).as("getProductPage");
});

afterEach(() => {
  localStorage.clear();
});
