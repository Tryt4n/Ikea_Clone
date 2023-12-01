export function startViewTransition(callback: () => void) {
  if (!document.startViewTransition) {
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
