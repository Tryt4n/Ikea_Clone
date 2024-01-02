export function getClubDiscount(price: number) {
  return Math.round(price * 0.035 * 2) / 2;
}
