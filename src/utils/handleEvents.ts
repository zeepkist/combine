import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'

import { Event, EventsMap, Metadata, UsersMap, UserStanding } from '../types.js'
import { handleEvent } from './index.js'

export const handleEvents = (
  events: string[],
  input: string,
  output: string
) => {
  const seasonUsers: UsersMap = new Map()
  const seasonEvents: EventsMap = new Map()
  let metadata: Metadata = {}

  if (events.includes('metadata.json')) {
    metadata = JSON.parse(readFileSync(`${input}/metadata.json`, 'utf8'))
    events.splice(events.indexOf('metadata.json'), 1)
  }

  for (const event of events) {
    const { levels, users } = handleEvent(`${input}/${event}`, metadata)

    for (const [steamId, user] of users) {
      const seasonUser = seasonUsers.get(steamId)
      if (seasonUser) {
        seasonUser.username = user.username
        seasonUser.team = user.team
      } else {
        seasonUsers.set(steamId, {
          username: user.username,
          team: user.team,
          totalPoints: 0,
          pointsPerRound: []
        })
      }
    }

    for (const [, data] of levels) {
      for (const item of data) {
        const seasonUser = seasonUsers.get(item.steamId)
        const user = users.get(item.steamId)

        if (user) {
          user.totalPoints += item.points ?? 0
          user.pointsPerRound.push(item.points ?? 0)
        }

        item.username = seasonUser?.username ?? user?.username ?? ''
        item.team = seasonUser?.team ?? user?.team ?? undefined
      }
    }

    for (const [steamId, user] of users) {
      const seasonUser = seasonUsers.get(steamId)

      if (seasonUser) {
        const bestOf = metadata.bestOf ?? Number.MAX_SAFE_INTEGER

        // add points for each round separately
        seasonUser.pointsPerRound.push(Math.round((user.totalPoints / levels.size) * 10))

        const sortedPoints = [...seasonUser.pointsPerRound].sort((a, b) => b - a);

        // calculate total points for the user (optionally based on X best point-scoring rounds if bestOf is set in metadata.json)
        seasonUser.totalPoints = sortedPoints.slice(0, bestOf).reduce((acc, point) => acc + point, 0);
      }
    }

    seasonEvents.set(event, levels)

    if (!existsSync(output)) {
      mkdirSync(output)
    }

    writeFileSync(
      `${output}/${event.replace('../', '')}.json`,
      JSON.stringify(
        {
          users: [...users]
            .sort((a, b) => b[1].totalPoints - a[1].totalPoints)
            .map(([steamId, user]) => ({
              ...user,
              steamId
            })),
          levels: [...levels].map(([level, standings]) => ({
            level,
            standings
          }))
        } as Event,
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
        .map(([steamId, user]) => {
          const totalPoints = Number((user.totalPoints).toFixed(0))

          return {
            ...user,
            steamId,
            totalPoints
          } as UserStanding
        }),
      undefined,
      2
    )
  )

  writeFileSync(
    `${output}/metadata.json`,
    JSON.stringify(metadata, undefined, 2)
  )

  console.log(
    `Generated leaderboard data for ${seasonEvents.size} events in`,
    output
  )

  return { metadata }
}
