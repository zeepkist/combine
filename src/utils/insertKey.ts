import type { Data } from './index.js'

/**
 * Inserts a key into an object at a specific position
 */
export const insertKey = (
  key: string,
  value: string,
  object: Data,
  pos: number
) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.keys(object).reduce((ac: any, a, index) => {
    if (index === pos) ac[key] = value
    ac[a] = object[a]
    return ac
  }, {})
