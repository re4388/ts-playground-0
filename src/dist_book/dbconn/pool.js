const { Pool } = require('pg')
const server = require('fastify')()


const DatabaseReconnection = require('./db')


/**
 * How many connections should your application use?
 * The best way to determine that is to run some real-world benchmarks in a production setting,
 * generating traffic at a certain request rate and seeing how many connections it takes to maintain your desired throughput.
 *
 * Perhaps you’ll find that the default 10 works for you.
 * At any rate, you should try to use the lowest number of database connections that will work to reach your performance needs.
 * Keeping this number low is important for a few reasons.
 *
 * One reason to minimize database connections is that there is a finite number of con‐ nections that a database will accept.
 *    In fact, the default number of connections that a Postgres database will accept is 100.
 *    This number can be configured per database server.
 *    Managed Postgres installations like AWS RDS have different connection limi‐ tations based on tier.
 *    If you go over the number of available connections, then the Postgres database server will refuse subsequent connections.
 */


const db = new Pool({
  host: 'localhost',
  port: 3399,
  user: 'nest0',
  password: 'nest0',
  database: 'nest0',
  max: process.env.MAX_CONN || 10
})



db.connect()

server.get('/', async () => (
  await db.query('SELECT NOW() AS time, \'world\' AS hello')).rows[0])
server.listen(3000, () => console.log(`http://localhost:3000`))