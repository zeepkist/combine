import test from 'ava'

import { numberToAlpha } from './index.js'

test('converts 0 to A', t => {
  t.is(numberToAlpha(0), 'A')
})

test('converts 1 to B', t => {
  t.is(numberToAlpha(1), 'B')
})

test('converts 9 to J', t => {
  t.is(numberToAlpha(9), 'J')
})

test('converts 10 to K', t => {
  t.is(numberToAlpha(10), 'K')
})

test('converts 23 to X', t => {
  t.is(numberToAlpha(23), 'X')
})

test('converts 47 to AV', t => {
  t.is(numberToAlpha(47), 'AV')
})

test('converts 499 to SF', t => {
  t.is(numberToAlpha(499), 'SF')
})
