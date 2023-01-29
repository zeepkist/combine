import { readFileSync } from 'node:fs'

import { parse } from 'csv-parse/sync'

import { dataPath } from '../config.js'
import { Data } from '../utils/index.js'

export const handleLeaderboard = (
  data: Data[],
  levels: Set<string>,
  event: string,
  file: string
) => {
  // `name` is the author of the level played
  const name = file.slice(35).split('-')[0]

  const leaderboardData = readFileSync(`${dataPath}/${event}/${file}`, 'utf8')

  const records = parse(leaderboardData, {
    columns: true,
    skip_empty_lines: true
  })

  levels.add(name)

  for (const record of records) {
    const index = data.findIndex(item => item.SteamId === record.SteamId)

    if (index === -1) {
      data.push({
        SteamId: record.SteamId,
        Username: record.Username,
        [name]: record.Time || undefined,
        [`${name}Points`]: 0
      })
    } else {
      data[index][name] = record.Time || undefined
      data[index][`${name}Points`] = 0
    }
  }

  return data
}
