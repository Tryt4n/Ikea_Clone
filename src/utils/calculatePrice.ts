export function calculatePrice(multiplier: number, integer: number, decimal?: number) {
  const decimalValue = decimal ? decimal / 100 : 0;
  const value = integer + decimalValue;
  const result = value * multiplier;
  const resultLocale = result.toLocaleString("pl-PL");

  return Number.isInteger(result) ? `${resultLocale},-` : resultLocale;
}
