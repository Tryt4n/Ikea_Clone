import type { ShoppingCartType } from "../context/AppContext";

export function startViewTransition(callback: () => void) {
  const prefersMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!document.startViewTransition || prefersMotion.matches) {
    callback();
  } else {
    document.startViewTransition(() => {
      callback();
    });
  }
}

export function getPrice(product: ShoppingCartType) {
  const { integer, decimal } = product.price;
  return integer + parseFloat(`0.${decimal || 0}`);
}

export function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
