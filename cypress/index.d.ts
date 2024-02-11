declare namespace Cypress {
  interface Chainable {
    checkProductsSortingInList<T>(
      element: string,
      productsArray: T,
    ): Chainable<Element>;
  }
}
