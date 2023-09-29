// npm install fastify@3.2 node-fetch@2.6

const dns = require('dns')

// Set default result order for DNS resolution
dns.setDefaultResultOrder('ipv4first')

const server = require('fastify')()
const fetch = require('node-fetch')
const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 3000
const TARGET = process.env.TARGET || 'localhost:4000'
const log = require('./logstash.js');


(async () => {


  // The middie package allows Fastify to use generic middleware.
  await server.register(require('middie'))

  // A middleware to log incoming requests.
  server.use((req, res, next) => {

    // A call to the logger that passes in request data.
    log('info', 'request-incoming', {
      path: req.url, method: req.method, ip: req.ip, ua: req.headers['user-agent'] || null
    })

    next()
  })


  // A generic middleware for logging errors.
  server.setErrorHandler(async (error, req) => {

    log('error', 'request-failure', {
      stack: error.stack,
      path: req.url, method: req.method
    })


    return { error: error.message }
  })


  server.get('/', async () => {

    const url = `http://${TARGET}/recipes/42`

    // Information about outbound requests is logged.
    log('info', 'request-outgoing', { url, svc: 'recipe-api' })

    const req = await fetch(url)
    const producer_data = await req.json()
    return { consumer_pid: process.pid, producer_data }
  })


  server.get('/error', async () => {
    throw new Error('oh no')
  })


  server.listen(PORT, HOST, () => {
    // Information about server starts is also logged.
    log('verbose', 'listen', { host: HOST, port: PORT })
  })



})()