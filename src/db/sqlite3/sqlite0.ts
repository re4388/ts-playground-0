import sqlite3 from 'sqlite3'
import * as _faker from 'faker'

const db = new sqlite3.Database(':sqlite_test_0:')

export function run_sqlite0() {
  init()
  insert1000User()
  //   queryAllUser()
  //   removeTable('users')
  db.close()
}

function removeTable(tableName: string) {
  const sql = `DELETE FROM ${tableName};`

  db.serialize(() => {
    db.run(sql)
  })
}

function queryAllUser() {
  db.serialize(() => {
    db.each('SELECT * FROM users', (err, row) => {
      console.log(row)
    })
  })
}

function insert1000User() {
  db.serialize(() => {
    for (let i = 0; i < 1000; i++) {
      const name = _faker.name.firstName()
      db.run('INSERT INTO users (id, name) VALUES (?, ?)', [i, name])
    }
  })
}

function init() {
  db.serialize(() => {
    db.each('SELECT * FROM users', (err, row) => {
      console.log('row', row)
      if (row !== undefined) {
        console.log('Users table is exited')

        return
      }
    })
  })
  //   db.serialize(() => {
  //     db.run('CREATE TABLE users (id INT, name TEXT)')
  //     db.run('INSERT INTO users (id, name) VALUES (?, ?)', [1, 'John Doe'])
  //     db.each('SELECT * FROM users', (err, row) => {
  //       console.log(row)
  //     })
  //   })

  //   db.close()
}
