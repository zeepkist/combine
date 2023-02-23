import test from 'ava'

import { splitUserTeam } from './index.js'

test('splitUserTeam returns username without team name', t => {
  t.deepEqual(splitUserTeam('username'), {
    username: 'username'
  })

  t.deepEqual(splitUserTeam('[username'), {
    username: '[username'
  })

  t.deepEqual(splitUserTeam('[username]'), {
    username: '[username]'
  })
})

test('splitUserTeam returns username with team name', t => {
  t.deepEqual(splitUserTeam('[team]username'), {
    username: 'username',
    team: 'team'
  })

  t.deepEqual(splitUserTeam('[team] username'), {
    username: 'username',
    team: 'team'
  })

  t.deepEqual(splitUserTeam('[team] [username]'), {
    username: '[username]',
    team: 'team'
  })
})

test('splitUserTeam returns username with team name and removes bad taste teams', t => {
  t.deepEqual(splitUserTeam('[CTR SUCKS]username'), {
    username: 'username'
  })

  t.deepEqual(splitUserTeam('[CTR SUCKS] username'), {
    username: 'username'
  })

  t.deepEqual(splitUserTeam('[CTR SUCKS] [username]'), {
    username: '[username]'
  })
})
