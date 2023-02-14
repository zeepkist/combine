import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'

import { Data, User } from './types.js'
import { handleEvent } from './utils/index.js'

export const combine = (input: string, output: string) => {
  const events = readdirSync(input)
  const seasonUsers = new Map<string, User>()
  const seasonEvents = new Map<string, Map<string, Data[]>>()

  for (const event of events) {
    const { levels, users } = handleEvent(`${input}/${event}`)
    console.log(levels.size, users.size)

    for (const [steamId, user] of users) {
      const seasonUser = seasonUsers.get(steamId)
      if (seasonUser) {
        seasonUser.username = user.username
      } else {
        seasonUsers.set(steamId, {
          username: user.username,
          totalPoints: 0
        })
      }
    }

    for (const [, data] of levels) {
      for (const item of data) {
        const user = users.get(item.steamId)
        if (user) {
          user.totalPoints += item.points ?? 0
        }

        const seasonUser = seasonUsers.get(item.steamId)
        item.username = seasonUser?.username ?? user?.username ?? ''
      }
    }

    for (const [steamId, user] of users) {
      const seasonUser = seasonUsers.get(steamId)
      if (seasonUser) {
        seasonUser.totalPoints += user.totalPoints / levels.size
      }
    }

    seasonEvents.set(event, levels)

    if (!existsSync(output)) {
      mkdirSync(output)
    }

    writeFileSync(
      `${output}/${event}.json`,
      JSON.stringify(
        {
          users: [...users].sort((a, b) => b[1].totalPoints - a[1].totalPoints),
          levels: [...levels]
        },
        undefined,
        2
      )
    )
  }

  writeFileSync(
    `${output}/standings.json`,
    JSON.stringify(
      [...seasonUsers]
        .sort((a, b) => b[1].totalPoints - a[1].totalPoints)
        .map(([, user]) => {
          user.totalPoints = Number(user.totalPoints.toFixed(2))
          return user
        }),
      undefined,
      2
    )
  )

  console.log(
    `Generated leaderboard data for ${seasonEvents.size} events in`,
    output
  )
}

// combine('./data', './output')
