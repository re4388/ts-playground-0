// The built-in dgram module sends UDP messages.
const client = require('dgram').createSocket('udp4')

const host = require('os').hostname()

// The Logstash location is stored in LOGSTASH.
const [LS_HOST, LS_PORT] = process.env.LOGSTASH.split(':')
const NODE_ENV = process.env.NODE_ENV

module.exports = function(severity, type, fields) {

  // Several fields are sent in the log message.
  const payload = JSON.stringify({
    '@timestamp': (new Date()).toISOString(),
    '@version': 1,
    app: 'web-api',
    environment: NODE_ENV,
    severity,
    type,
    fields,
    host
  })

  console.log(payload)

  client.send(payload, LS_PORT, LS_HOST)
}

//
// $ NODE_ENV=development LOGSTASH=localhost:7777 node web-api/consumer-http-logs.js
// $ node recipe-api/producer-http-basic.js
// $ brew install watch # required for macOS
// $ watch -n5 curl http://localhost:3000
// $ watch -n13 curl http://localhost:3000/error