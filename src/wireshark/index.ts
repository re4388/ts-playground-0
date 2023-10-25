import pg, { Client } from 'pg'

const ClientClass = pg.Client
const pgUrl = 'postgres://wuldmskc:59tHzizSDRGcqLtHxRmFMz01B3qXLF10@tiny.db.elephantsql.com/wuldmskc'
const client = new ClientClass(pgUrl)


async function connect(client: Client) {
  try {
    await client.connect()
    console.log('client is connected')

    const { rows } = await client.query('select * from employees')
    // id, name


    console.log('rows: ', rows)
  } catch (error) {
    console.log('we have an error', error)
  } finally {
    await client.end()
  }
}

connect(client)
