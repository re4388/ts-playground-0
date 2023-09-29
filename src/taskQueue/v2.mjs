export class TaskQueueV2 {
  constructor (concurrency) {
    this.concurrency = concurrency
    this.running = 0
    this.queue = []
  }

  runTask (task) {
    return new Promise((resolve, reject) => {

      this.queue.push(async () => {
        try {
          return resolve(task())
        } catch (err) {
          // not sure if this rejection needs to have a return or not?
          return reject(err)
        }
      })

      process.nextTick(this.next.bind(this))
    })
  }

  next () {
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift()

        // a way to convert to async/await
      ;(async () => {
        await task()
        this.running--
        this.next()
      })()

      this.running++
    }
  }
}

// https://github.com/Jack-Barry/Node.js-Design-Patterns-Third-Edition/blob/chapters/5/05-asynchronous-control-flow-patterns-with-promises-and-async-await/eoc-exercises/5_2_TaskQueue_async_await.js
