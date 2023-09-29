
import sqlite3 from 'sqlite3'
const db = new sqlite3.Database('tmp1')

async function init() {
  db.serialize(() => {
    db.run('CREATE TABLE users (id INT, name TEXT)')
  })
}

async function run_sqlite0() {
    await init()
  db.close()
}


run_sqlite0()
