export class ZmqMiddlewareManager {
  constructor(socket) {
    this.socket = socket

    // 2 arr to handle inbound and outbound (like preprocess and postprocess)
    // support multiple middleware, so we use arr here
    this.inboundMiddleware = []
    this.outboundMiddleware = []

    this.handleIncomingMessages()
      .catch(err => console.error(err))
  }

  async handleIncomingMessages() {
    // for-await-of construct, so this.socket impl async iterator
    // 把 socket 傳過來的東西， sequential 傳給 middleware 處理
    for await (const [message] of this.socket) {
      await this
        .runAllMiddleware(this.inboundMiddleware, message)
        .catch(err => {
          console.error('Error while processing the message', err)
        })
    }
  }

  // 不管是 client or server side
  // send 東西出去都算是 outbound, 所以走 outboundMiddleware
  // 然後最後都透過 socket 傳出去（到另外一邊）
  async send(message) {
    const finalMessage = await this
      .runAllMiddleware(this.outboundMiddleware, message)
    return this.socket.send(finalMessage)
  }

  // 判斷是 inbound or outbound and then add into 2 arr
  use(middleware) {
    /**
     *
     *  the operation FIRST run at pre-process steps shall LAST run at post-process steps
     *  this is why we use PUSH at pre-process and UNSHIFT at post-process
     *
     *  For example, if we want to decompress and then deserialize an inbound
     *  message using JSON, it means that for the outbound, we should
     *  instead first serialize and then compress.
     */
    if (middleware.inbound) {
      this.inboundMiddleware.push(middleware.inbound)
    }
    if (middleware.outbound) {
      this.outboundMiddleware.unshift(middleware.outbound)
    }
  }

  async runAllMiddleware(middlewares, initialMessage) {
    let message = initialMessage

    for await (const middlewareFunc of middlewares) {
      // 一個一個讓 middle 呼叫然後pass msg in
      message = await middlewareFunc.call(this, message)
    }
    return message
  }
}
