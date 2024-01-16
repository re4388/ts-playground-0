import { Client, ClientConfig, QueryResult } from 'pg'
import { strictEqual } from 'assert'
import { parse } from 'pg-connection-string'


const connectionString = 'postgres://local:local@127.0.0.1:54399/hermes_local'

async function checkConnection() {
  try {
    const res = await checkPgConnectionAlive(connectionString, 'SELECT 1')
    console.log('------->res.rowCount: ', res.rowCount)
    strictEqual(res.rowCount, 1)
  } catch (err) {
    console.log(err)
  }
}

checkConnection().then(res => console.log(res)).catch(err => console.log(err))


function checkPgConnectionAlive(connectionString: string, query: string): Promise<QueryResult> {
  // No query provided by the user, use SELECT 1
  if (!query || (typeof query === 'string' && query.trim() === '')) {
    query = 'SELECT 1'
  }


  return new Promise((resolve, reject) => {
    const config = parse(connectionString)

    if (typeof config.ssl === 'string') {
      config.ssl = config.ssl === 'true'
    }

    if (config.password === '') {
      reject(new Error('Password is undefined.'))
      return
    }

    const client = new Client(config as unknown as ClientConfig)

    client.on('error', (error) => {
      console.log('postgres', 'Error caught in the error event handler.')
      reject(error)
    })

    client.connect((err) => {
      if (err) {
        client.end()
        reject(err)
      }


      try {
        client.query(query, (_err, res) => {
          resolve(res)
          client.end()
        })
      } catch (e) {
        client.end()
        reject(e)
      }
    })
  })
}
