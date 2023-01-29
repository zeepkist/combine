import test from 'ava'

import { Data, insertKey } from './index.js'

test('inserts key at position 0', t => {
  t.deepEqual(
    insertKey(
      'Test',
      'content',
      {
        SteamId: '123',
        Username: 'Test User'
      } as Data,
      0
    ),
    {
      Test: 'content',
      SteamId: '123',
      Username: 'Test User'
    }
  )
})

test('inserts key at position 1', t => {
  t.deepEqual(
    insertKey(
      'Test',
      'content',
      {
        SteamId: '123',
        Username: 'Test User'
      } as Data,
      1
    ),
    {
      SteamId: '123',
      Test: 'content',
      Username: 'Test User'
    }
  )
})
