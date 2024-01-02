/**
 * calculatePrice function
 *
 * This function calculates the price of a product based on a multiplier.
 *
 * @param multiplier - The multiplier to calculate the price with.
 * @param integer - The integer part of the price.
 * @param decimal - The decimal part of the price (optional).
 *
 * @returns The calculated price as a string in the "pl-PL" locale. If the calculated price is an integer, it appends ",-" to the end of the string.
 *
 * @example
 *
 * calculatePrice(2, 100, 50); // returns "201,-"
 * calculatePrice(3, 200); // returns "600,-"
 * calculatePrice(1, 100, 99); // returns "100,99"
 */
export function calculatePrice(multiplier: number, integer: number, decimal?: number) {
  const decimalValue = decimal ? decimal / 100 : 0;
  const value = integer + decimalValue;
  const result = value * multiplier;
  const resultLocale = result.toLocaleString("pl-PL");

  return Number.isInteger(result) ? `${resultLocale},-` : resultLocale;
}
