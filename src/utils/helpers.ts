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

export function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
