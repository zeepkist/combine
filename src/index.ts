import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'

import { handleEvents, handleSeasons } from './utils/index.js'

export const combine = (input: string, output: string) => {
  if (!existsSync(output)) {
    mkdirSync(output)
  }

  const folders = readdirSync(input)

  // Check if the input folder is an event
  const isEvent = folders.every(folder => folder.endsWith('.csv'))

  if (isEvent) {
    handleEvents([`../${input}`], input, output)
    return
  }

  // Check if the input folder is a folder of events
  const isEvents = folders.every(folder => {
    const subFolders = readdirSync(`${input}/${folder}`)
    return subFolders.every(subFolder => subFolder.endsWith('.csv'))
  })

  if (isEvents) {
    const { metadata } = handleEvents(folders, input, output)
    writeFileSync(`${output}/metadata.json`, JSON.stringify(metadata))
  } else {
    handleSeasons(folders, input, output)
  }

  console.log(`Finished processing. Output is in ${output}`)
  return
}
