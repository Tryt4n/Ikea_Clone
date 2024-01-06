import type { ShoppingCartType } from "../context/AppContext/AppContext";

/**
 * startViewTransition function
 *
 * This function starts a view transition if the user's system doesn't prefer reduced motion.
 *
 * @param callback - The function to call after the view transition starts.
 *
 * @returns Nothing.
 */
export function startViewTransition(callback: () => void) {
  // Check if the user's system prefers reduced motion
  const prefersMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // If the startViewTransition method doesn't exist on the document object or the user's system prefers reduced motion, call the callback function
  if (!document.startViewTransition || prefersMotion.matches) {
    callback();
  } else {
    // Otherwise, start the view transition and call the callback function
    document.startViewTransition(() => {
      callback();
    });
  }
}

/**
 * getPrice function
 *
 * This function calculates the price of a product.
 *
 * @param product - The product.
 *
 * @returns The price of the product.
 */
export function getPrice(product: ShoppingCartType) {
  // Destructure the price of the product
  const { integer, decimal } = product.price;
  // Return the sum of the integer part of the price and the decimal part of the price
  return integer + parseFloat(`0.${decimal || 0}`);
}
