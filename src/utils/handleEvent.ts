import { readdirSync } from 'node:fs'

import { LevelsMap, Metadata, UsersMap } from '../types.js'
import { handleLeaderboard, pointsDistribution } from './index.js'

export const handleEvent = (path: string, metadata: Metadata) => {
  const files = readdirSync(path)
  const levels: LevelsMap = new Map()
  const users: UsersMap = new Map()

  for (const file of files) {
    handleLeaderboard({
      levels,
      users,
      path,
      file
    })
  }

  const points = metadata.points ?? pointsDistribution
  const finishPoints = metadata.finishPoints ?? 1

  for (const [levelUid, record] of levels) {
    const steamIds = new Set<string>()
    const deduplicatedRecords = record
      .filter(user => {
        if (steamIds.has(user.steamId)) {
          return false
        }

        steamIds.add(user.steamId)
        return true
      })
      .sort((a, b) => a.time - b.time)

    for (const [index, item] of deduplicatedRecords.entries()) {
      item.points = points[index] || finishPoints
    }

    levels.set(levelUid, deduplicatedRecords)
  }

  console.log(`Finished processing ${path}`)

  return { levels, users }
}
