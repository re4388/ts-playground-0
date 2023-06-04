import sqlite3 from 'sqlite3'
import * as _faker from 'faker'

const db = new sqlite3.Database('sqlite_test_0.sqlite')

export async function run_sqlite0() {
  //   await init()
  //   await insert1000User()
  queryAllUser()
  //   removeTable('users')
  db.close()
}

// function removeTable(tableName: string) {
//   const sql = `DELETE FROM ${tableName};`
//   db.serialize(() => {
//     db.run(sql)
//   })
// }

function queryAllUser() {
  db.serialize(() => {
    db.each('SELECT * FROM users', (err, row) => {
      console.log(row)
    })
  })
}

async function insert1000User() {
  return new Promise((resolve, reject) => {
    try {
      db.serialize(() => {
        for (let i = 0; i < 1000; i++) {
          const name = _faker.name.firstName()
          db.run('INSERT INTO users (id, name) VALUES (?, ?)', [i, name])
        }
      })
      resolve('done')
    } catch (error) {
      reject(error)
    }
  })
}

async function init() {
  db.serialize(() => {
    db.run('CREATE TABLE users (id INT, name TEXT)')
  })
}
