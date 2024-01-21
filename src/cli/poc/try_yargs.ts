#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

type Argv = Record<'ships' | 'distance', number>
const argv = yargs(hideBin(process.argv)).parse() as unknown as Argv

if (argv.ships > 3 && argv.distance < 53.5) {
  console.log('------->argv.ships: ', argv.ships)
  console.log('------->argv.distance: ', argv.distance)
  console.log('yes')
} else {
  console.log('no')
}
