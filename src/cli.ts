#!/usr/bin/env node

import { program } from 'commander'

import { combine } from './index.js'

program.option('-i, --input <input>', 'input folder path containing CSV files')

program.option('-o, --output <output>', 'output folder path to save JSON files')

program.parse()

const { input, output } = program.opts()

if (!input || typeof input !== 'string') {
  console.log('Please provide a valid input path')
  process.exit(1)
}

if (!output || typeof output !== 'string') {
  console.log('Please provide a valid output path')
  process.exit(1)
}

combine(input, output)
