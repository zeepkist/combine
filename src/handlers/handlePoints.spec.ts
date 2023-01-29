import test from 'ava'

import { Data } from '../utils/index.js'
import { handlePoints } from './handlePoints.js'

test('generates points for 1 level', t => {
  const data = [
    {
      SteamId: '123',
      Username: 'Test User',
      'Level 1': 10,
      'Level 1Points': 0
    }
  ]
  t.deepEqual(handlePoints(data as unknown as Data[], new Set(['Level 1'])), [
    {
      SteamId: '123',
      Username: 'Test User',
      'Level 1': 10,
      'Level 1Points': 25,
      Points: '=IFERROR(E3, 0)'
    }
  ])
})

test('generates points for multiple levels and users', t => {
  const data = [
    {
      SteamId: '123',
      Username: 'Test User',
      'Level 1': 10,
      'Level 1Points': 0,
      'Level 2': 20,
      'Level 2Points': 0
    },
    {
      SteamId: '456',
      Username: 'Test User 2',
      'Level 1': 20,
      'Level 1Points': 0,
      'Level 2': 15,
      'Level 2Points': 0
    }
  ]
  t.deepEqual(
    handlePoints(data as unknown as Data[], new Set(['Level 1', 'Level 2'])),
    [
      {
        SteamId: '456',
        Username: 'Test User 2',
        'Level 1': 20,
        'Level 1Points': 22,
        'Level 2': 15,
        'Level 2Points': 25,
        Points: '=IFERROR(E3 + G3, 0)'
      },
      {
        SteamId: '123',
        Username: 'Test User',
        'Level 1': 10,
        'Level 1Points': 25,
        'Level 2': 20,
        'Level 2Points': 22,
        Points: '=IFERROR(E4 + G4, 0)'
      }
    ]
  )
})
