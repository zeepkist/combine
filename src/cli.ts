#!/usr/bin/env node

import { program } from 'commander'

import { combine } from './index.js'

program.option('-i, --input <input>', 'input folder path containing CSV files')

program.option('-o, --output <output>', 'output folder path to save JSON files' )

program.parse()

const { input, output } = program.opts()

combine(input, output)
