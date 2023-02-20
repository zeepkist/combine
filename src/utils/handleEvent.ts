import { readdirSync } from 'node:fs'

import { Data, User } from '../types.js'
import { handleLeaderboard, pointsDistribution } from './index.js'

export const handleEvent = (path: string) => {
  const files = readdirSync(path)
  const levels = new Map<string, Data[]>()
  const users = new Map<string, User>()

  for (const file of files) {
    handleLeaderboard({
      levels,
      users,
      path,
      file
    })
  }

  for (const [, data] of levels) {
    data.sort((a, b) => a.time - b.time)
    data.map((item, index) => {
      item.points = pointsDistribution[index] || 1 // 1 point for everyone who finished the level
    })
  }

  return { levels, users }
}