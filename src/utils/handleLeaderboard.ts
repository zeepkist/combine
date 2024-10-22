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
  // `uid` is the unique id of the level played. End of the UID is indicated by '_Xw==_' in the file name
  const uid = file.slice(16).split('_Xw==_')[0]
  console.log(`Processing ${uid}`)

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
      totalPoints: 0,
      pointsPerRound: [],
    })

    const level = levels.get(uid)
    if (level) {
      level.push({
        steamId: record.SteamId,
        time: Number(record.Time)
      })
    } else {
      levels.set(uid, [
        {
          steamId: record.SteamId,
          time: Number(record.Time)
        }
      ])
    }
  }
}
