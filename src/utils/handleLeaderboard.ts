import { readFileSync } from 'node:fs'

import { parse } from 'csv-parse/sync'

import { LevelsMap, RawRecord, UsersMap } from '../types.js'
import { splitUserTeam } from './index.js'

interface Properties {
  levels: LevelsMap
  users: UsersMap
  path: string
  file: string
}

export const handleLeaderboard = ({
  levels,
  users,
  path,
  file
}: Properties) => {
  // `name` is the author of the level played
  const name = file.slice(35).split('-')[0]

  const fileData = readFileSync(`${path}/${file}`, 'utf8')
  const records: RawRecord[] = parse(fileData, {
    columns: true,
    skip_empty_lines: true
  })

  for (const record of records) {
    const { username, team } = splitUserTeam(record.Username)
    users.set(record.SteamId, {
      username,
      team,
      totalPoints: 0
    })

    const level = levels.get(name)
    if (level) {
      level.push({
        steamId: record.SteamId,
        time: Number(record.Time)
      })
    } else {
      levels.set(name, [
        {
          steamId: record.SteamId,
          time: Number(record.Time)
        }
      ])
    }
  }
}
