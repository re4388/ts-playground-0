// npm install fastify@3.2 pg@8.2
const server = require('fastify')()

const DatabaseReconnection = require('./db.js')


// docker run -d --name angelia-nest0 -p 3399:5432 -e POSTGRES_USER="nest0" -e POSTGRES_PASSWORD="nest0" -e POSTGRES_DB="nest0" -d postgres:15
const db = new DatabaseReconnection({
  host: 'localhost',
  port: 3399,
  user: 'nest0',
  password: 'nest0',
  database: 'nest0',
  retry: 1_000
})

// This call kicks off the database connection.
db.connect()

db.on('error', (err) => console.error('db error', err.message))
db.on('reconnect', () => console.log('reconnecting...'))
db.on('connect', () => console.log('connected.'))
db.on('disconnect', () => console.log('disconnected.'))



server.get('/foo/:foo_id', async (req, reply) => {
  try {

    // Basic parameterized query without a table
    var res = await db.query(
      'SELECT NOW() AS time, $1 AS echo', [req.params.foo_id])
  } catch (err) {
    reply.statusCode = 503
    return err
  }
  return res.rows[0]
})


// An example health endpoint
server.get('/health', async (req, reply) => {
  if (!db.connected) {
    throw new Error('no db connection')
  }
  return 'OK'
})


server.listen(3000, () => console.log(`http://localhost:3000`))