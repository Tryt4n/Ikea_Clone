export function startViewTransition(callback: () => void) {
  if (!document.startViewTransition) {
    callback();
  }

  document.startViewTransition(() => {
    callback();
  });
}

export function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
