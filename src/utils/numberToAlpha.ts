/**
 * Converts a number to a Google Sheets column name (A, B, .. AA, etc.).
 */
export const numberToAlpha = (number: number) => {
  let string = ''
  for (; number >= 0; number = Math.floor(number / 26) - 1) {
    string = String.fromCodePoint((number % 26) + 0x41) + string
  }
  return string
}
