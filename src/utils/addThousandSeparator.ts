/**
 * addThousandSeparator function
 *
 * This function adds a thousand separator to a number.
 *
 * @param number - The number to add the thousand separator to.
 *
 * @returns The number as a string with a thousand separator.
 *
 * @example
 *
 * addThousandSeparator(1000); // returns "1 000"
 * addThousandSeparator(1000000); // returns "1 000 000"
 * addThousandSeparator(123456789); // returns "123 456 789"
 */
export function addThousandSeparator(number: number) {
  // Convert the number to a string and replace every group of three digits (from the end) that is not followed by a digit with a space
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
