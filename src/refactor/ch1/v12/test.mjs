import { statement } from './statement.mjs'
import { invoicesMock, playMock } from '../data/data.mjs'
import assert from 'node:assert'
const expectObj = 'Statement for BigCo\n' +
  ' Hamlet: $650.00 (55 seats)\n' +
  ' As You Like It: $580.00 (35 seats)\n' +
  ' Othello: $500.00 (40 seats)\n' +
  'Amount owed is $1,730.00\n' +
  'You earned 47 credits\n'
let res = statement(invoicesMock, playMock)
assert.equal(res, expectObj)
