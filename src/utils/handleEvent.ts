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

  for (const [, data] of levels) {
    data.sort((a, b) => a.time - b.time)
    data.map((item, index) => {
      item.points = points[index] || finishPoints
    })
  }

  console.log(`Finished processing ${path}`)

  return { levels, users }
}
