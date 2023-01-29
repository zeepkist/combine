import { numberToAlpha } from './index.js'

/**
 * Generates a formula to sum the points the user has for each level
 */
export const generateTotalsFormula = (
  numberOfLevels: number,
  index: number
) => {
  const sheetIndex = index + 3 // +3 because of 2 header rows and 1 based index in google sheet

  const formula = Array.from(
    { length: numberOfLevels },
    (_, index_) => index_ + 1
  )
    .map(index_2 => `${numberToAlpha(index_2 * 2 + 2)}${sheetIndex}`)
    .join(' + ')

  return `=IFERROR(${formula}, 0)`
}
