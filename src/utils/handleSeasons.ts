import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'

import { Metadata } from '../types.js'
import { handleEvents } from './index.js'

export const handleSeasons = (
  seasons: string[],
  input: string,
  output: string
) => {
  const seasonMetadata = new Map<string, Metadata>()

  if (!existsSync(output)) {
    mkdirSync(output)
  }

  for (const season of seasons) {
    const { metadata } = handleEvents(
      readdirSync(`${input}/${season}`),
      `${input}/${season}`,
      `${output}/${season}`
    )
    seasonMetadata.set(season, metadata)
  }

  writeFileSync(`${output}/metadata.json`, JSON.stringify([...seasonMetadata]))

  console.log(`Generated ${seasons.length} seasons`)
}
