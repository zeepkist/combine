import test from 'ava'

import { generateTotalsFormula } from './index.js'

test('generates formula for 1 level for first user', t => {
  t.is(generateTotalsFormula(1, 0), '=IFERROR(E3, 0)')
})

test('generates formula for 4 levels for second user', t => {
  t.is(generateTotalsFormula(4, 1), '=IFERROR(E4 + G4 + I4 + K4, 0)')
})
