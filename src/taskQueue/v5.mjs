// https://github.com/kasymbayaman/node.js-design-patterns-solutions/blob/main/05-promises-async-patterns/5.2-taskqueue-promises.js


/* Migrate the TaskQueue class internals from
promises to async/await where possible. Hint: you won't be able to use
async/await everywhere.
*/

export class TaskQueueV5 {
  constructor(concurrency) {
    this.concurrency = concurrency
    this.running = 0
    this.queue = []
  }

  // cannot be migrated to async because of error handling issues
  run(task) {
    return new Promise((resolve, reject) => {

      this.queue.push(() => {
        return task().then(resolve, reject)
      })

      process.nextTick(this.next.bind(this))
    })
  }

  async next() {
    while (this.running < this.concurrency && this.queue.length) {

      const task = this.queue.shift()

      this.running++

      try {
        await task()
      } catch (e) {
        console.error(e)
      } finally {
        this.running--
        await this.next()
      }
    }
  }
}
