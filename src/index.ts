import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'

import { stringify } from 'csv-stringify/sync'

import { dataPath, eventsPath } from './config.js'
import { handleEvent } from './handlers/handleEvent.js'

const events = readdirSync(dataPath)

for (const event of events) {
  const data = handleEvent(event)

  if (!existsSync(eventsPath)) {
    mkdirSync(eventsPath)
  }

  writeFileSync(
    `${eventsPath}/${event}.csv`,
    stringify(data, {
      header: true
    })
  )

  console.log(`Generated ${eventsPath}/${event}.csv`)
}
