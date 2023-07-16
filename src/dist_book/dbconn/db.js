const { Client } = require('pg')
const { EventEmitter } = require('events')

class DatabaseReconnection extends EventEmitter {
  // client and conn are necessary abstraction for db to setup a connect
  #client = null
  #conn = null

  // kill flag to know if disconnect is intended
  #kill = false

  // connceted flag to know the current connected state
  connected = false

  constructor(conn) {
    super()
    this.#conn = conn
  }

  connect() {

    // Terminate any existing connections if it is already existed
    if (this.#client) {
      this.#client.end()
    }

    // if we manually kill it, return and no need to connect
    if (this.kill) return

    // begin to connect, new up a client w/ connect
    const client = new Client(this.#conn)

    // handle client err
    client.on('error', (err) => this.emit('error', err))

    // handle end of the connection by attempt to reconnect when a connection ends.
    client.once('end', () => {
      // in case we are connected and turn into `end` -> we know we disconnect
      if (this.connected) this.emit('disconnect')
      // change flag
      this.connected = false

      // if this is kill by manual, no need to retry
      if (this.kill) return

      // retry by setting or 1 sec in default
      setTimeout(() => this.connect(), this.#conn.retry || 1_000)
    })

    // handle err
    client.connect((err) => {
      this.connected = !err
      if (!err) this.emit('connect')
    })

    this.#client = client
    this.emit('reconnect')

  }

  async query(q, p) {
    if (this.#kill || !this.connected) throw new Error('disconnected')
    return this.#client.query(q, p)
  }

  disconnect() {
    this.#kill = true
    this.#client.end()
  }
}

module.exports = DatabaseReconnection

