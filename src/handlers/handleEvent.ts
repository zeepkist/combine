import { readdirSync } from 'node:fs'

import { dataPath } from '../config.js'
import { Data } from '../utils/index.js'
import { handleLeaderboard } from './handleLeaderboard.js'
import { handlePoints } from './handlePoints.js'

export const handleEvent = (event: string) => {
  const files = readdirSync(`${dataPath}/${event}`)
  let eventData: Data[] = []
  const eventLevels: Set<string> = new Set()

  for (const file of files) {
    eventData = handleLeaderboard(eventData, eventLevels, event, file)
  }

  // Assign points to users based on their time for each level
  eventData = handlePoints(eventData, eventLevels)

  console.log(
    `Processed ${eventLevels.size} levels and ${eventData.length} users`
  )

  return eventData
}
